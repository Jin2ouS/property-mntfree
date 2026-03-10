import Database from 'better-sqlite3'
import { mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

let db

export function getDb() {
  if (!db) {
    const dataDir = join(__dirname, '..', 'data')
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
    const dbPath = process.env.DATABASE_PATH || join(dataDir, 'properties.db')
    db = new Database(dbPath)
    initSchema(db)
  }
  return db
}

function initSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      address TEXT,
      court TEXT,
      appraisal_value INTEGER,
      lowest_bid INTEGER,
      auction_date TEXT,
      failed_bids INTEGER,
      usage_type TEXT,
      raw_json TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS favorites (
      property_id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (property_id) REFERENCES properties(id)
    );

    CREATE INDEX IF NOT EXISTS idx_properties_address ON properties(address);
    CREATE INDEX IF NOT EXISTS idx_properties_auction_date ON properties(auction_date);
  `)
}

export function upsertProperties(properties) {
  const database = getDb()
  const stmt = database.prepare(`
    INSERT INTO properties (id, address, court, appraisal_value, lowest_bid, auction_date, failed_bids, usage_type, raw_json, updated_at)
    VALUES (@id, @address, @court, @appraisal_value, @lowest_bid, @auction_date, @failed_bids, @usage_type, @raw_json, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      address = excluded.address,
      court = excluded.court,
      appraisal_value = excluded.appraisal_value,
      lowest_bid = excluded.lowest_bid,
      auction_date = excluded.auction_date,
      failed_bids = excluded.failed_bids,
      usage_type = excluded.usage_type,
      raw_json = excluded.raw_json,
      updated_at = datetime('now')
  `)
  const insertMany = database.transaction((items) => {
    for (const p of items) {
      stmt.run({
        id: p.id,
        address: p.address ?? null,
        court: p.court ?? null,
        appraisal_value: p.appraisal_value ?? null,
        lowest_bid: p.lowest_bid ?? null,
        auction_date: p.auction_date ?? null,
        failed_bids: p.failed_bids ?? null,
        usage_type: p.usage_type ?? null,
        raw_json: typeof p.raw_json === 'string' ? p.raw_json : JSON.stringify(p)
      })
    }
  })
  insertMany(properties)
  return properties.length
}

export function listProperties() {
  const database = getDb()
  const rows = database.prepare(`
    SELECT id, address, court, appraisal_value, lowest_bid, auction_date, failed_bids, usage_type, created_at, updated_at
    FROM properties
    ORDER BY auction_date ASC, updated_at DESC
  `).all()
  return rows
}

export function listFavorites() {
  const database = getDb()
  const rows = database.prepare(`
    SELECT p.id, p.address, p.court, p.appraisal_value, p.lowest_bid, p.auction_date, p.failed_bids, p.usage_type, p.created_at
    FROM properties p
    INNER JOIN favorites f ON p.id = f.property_id
    ORDER BY f.created_at DESC
  `).all()
  return rows
}
