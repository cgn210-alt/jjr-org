/* ─────────────────────────────────────────────────────────────────────
   중종로공동체 공식 인원 — 단일 출처(SOURCE OF TRUTH)

   ※ 인원/순 숫자를 바꿀 일이 생기면 이 파일의 COMMUNITY_TOTALS 한 곳만
     수정하세요. index.html(참석 응답률), orgchart.html(조직도),
     org.html(다락방별 명단) 세 페이지에 모두 자동 반영됩니다.

   - members : 해당 다락방 공식 인원수
   - sun     : 해당 다락방 순(順) 개수
─────────────────────────────────────────────────────────────────────── */
const COMMUNITY_TOTALS = {
  '믿음1': { label: '믿음1다락방', members: 61, sun: 6 },
  '믿음2': { label: '믿음2다락방', members: 48, sun: 6 },
  '소망1': { label: '소망1다락방', members: 33, sun: 4 },
  '소망2': { label: '소망2다락방', members: 22, sun: 3 },
  '사랑1': { label: '사랑1다락방', members: 73, sun: 7 },
  '사랑2': { label: '사랑2다락방', members: 80, sun: 8 },
};

/* 대(大)다락방 묶음 */
const COMMUNITY_GROUPS = {
  '믿음': ['믿음1', '믿음2'],
  '소망': ['소망1', '소망2'],
  '사랑': ['사랑1', '사랑2'],
};

/* 묶음(믿음/소망/사랑) 합계 */
function communityGroupTotal(group) {
  var keys = COMMUNITY_GROUPS[group] || [];
  return keys.reduce(function (acc, k) {
    acc.members += COMMUNITY_TOTALS[k].members;
    acc.sun     += COMMUNITY_TOTALS[k].sun;
    return acc;
  }, { members: 0, sun: 0 });
}

/* 다락방에 속하지 않는 리더십 인원 (담당목사 노치형) */
const COMMUNITY_LEADERSHIP = 1;

/* 전체 합계 (다락방 합계 + 담당목사) */
function communityGrandTotal() {
  return Object.keys(COMMUNITY_TOTALS).reduce(function (acc, k) {
    acc.members += COMMUNITY_TOTALS[k].members;
    acc.sun     += COMMUNITY_TOTALS[k].sun;
    return acc;
  }, { members: COMMUNITY_LEADERSHIP, sun: 0 });
}

/* 키 해석: 'ALL' | 'GROUP:믿음' | '믿음1' 등 */
function _ctLookup(key) {
  if (key === 'ALL') return communityGrandTotal();
  if (key.indexOf('GROUP:') === 0) return communityGroupTotal(key.slice(6));
  var e = COMMUNITY_TOTALS[key];
  return e ? { members: e.members, sun: e.sun } : { members: 0, sun: 0 };
}

/* ─────────────────────────────────────────────────────────────────────
   HTML에 data 속성으로 숫자를 자동 채워주는 헬퍼

   사용 예:
     <span data-ct-members="ALL"></span>        → "318명"
     <span data-ct-sun="ALL"></span>            → "33개 순"
     <span data-ct-members="GROUP:믿음"></span> → "109명"
     <span data-ct-sun="GROUP:믿음"></span>     → "12개 순"
     <span data-ct-members="믿음1"></span>      → "61명"
     <span data-ct-sun="믿음1"></span>          → "6개 순"

   숫자만 필요하면 data-ct-num="...", data-ct-sunnum="..." 사용(접미사 없음).
─────────────────────────────────────────────────────────────────────── */
function applyCommunityTotals(root) {
  root = root || document;
  root.querySelectorAll('[data-ct-members]').forEach(function (el) {
    el.textContent = _ctLookup(el.getAttribute('data-ct-members')).members + '명';
  });
  root.querySelectorAll('[data-ct-num]').forEach(function (el) {
    el.textContent = _ctLookup(el.getAttribute('data-ct-num')).members;
  });
  root.querySelectorAll('[data-ct-sun]').forEach(function (el) {
    el.textContent = _ctLookup(el.getAttribute('data-ct-sun')).sun + '개 순';
  });
  root.querySelectorAll('[data-ct-sunnum]').forEach(function (el) {
    el.textContent = _ctLookup(el.getAttribute('data-ct-sunnum')).sun;
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () { applyCommunityTotals(); });
}
