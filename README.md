# jjr-org — 중종로공동체 조직도

다락방별 명단과 조직도.

- **다락방별 명단**: https://cgn210-alt.github.io/jjr-org/org.html
- **조직도**: https://cgn210-alt.github.io/jjr-org/orgchart.html

## 파일 구성

- `org.html` — 다락방별 명단 (믿음/소망/사랑 다락방 · 순별 순장·순원)
- `orgchart.html` — 조직도 (담당목사, 장로, 권사회, 사역 담당 등)
- `community-totals.js` — **공식 인원/순 개수 데이터의 단일 출처(SOURCE OF TRUTH)**

## 인원수 수정 방법

`community-totals.js`의 `COMMUNITY_TOTALS` 한 곳만 고치면 `org.html`, `orgchart.html`에 자동 반영됩니다.

**주의**: 이 파일은 [jjr-jonggangye-2026](https://github.com/cgn210-alt/jjr-jonggangye-2026)의 `index.html`(기도앱)에서도 절대경로로 불러다 씁니다. 파일명을 바꾸거나 `COMMUNITY_TOTALS`의 키 구조를 바꾸면 그쪽도 함께 확인해야 합니다.

## 배포

`사이트-올리기.bat` 더블클릭 → `git add / commit / push` 자동 실행 → GitHub Actions가 1~2분 내 자동 배포.
