# property.mntfree

포트폴리오 구조 기반 부동산 자산 설계 시스템을 소개하는 랜딩 페이지입니다.

- **도메인**: [property.mntfree.com](https://property.mntfree.com)
- **브랜드**: EVERPRIN · MnTfree

투자 수익률을 약속하지 않고, **체계적 자산 구조**, **리스크 관리**, **현금 흐름**, **장기 계획**을 전달합니다.

## 스택

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (아이콘)

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 으로 확인합니다.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run lint` | ESLint 실행 |

## 배포 (GitHub Pages)

- **저장소**에서 **Settings → Pages** 에서 Source를 **GitHub Actions** 로 설정하면, `main` 브랜치 푸시 시 자동으로 빌드·배포됩니다.
- 배포 URL: `https://<username>.github.io/property-mntfree/`
- 커스텀 도메인(property.mntfree.com)을 쓰려면 Pages 설정에서 **Custom domain**에 도메인을 입력하고 DNS(CNAME 또는 A 레코드)만 연결하면 됩니다.

## 프로젝트 구조

```
src/
├── components/     # Hero, AssetsWithIntention, PortfolioFramework, CorePrinciples, Closing
├── App.tsx
├── main.tsx
└── index.css
```

## 라이선스

Private · EVERPRIN
