import { JournalArticle } from '../types';
import { IMAGES } from '../assets/images';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'catch-the-light-1',
    title: 'Catch the Light: 빛을 머금은 유리알 입술 완성하는 3가지 레이어링 법칙',
    category: 'Beauty Guide',
    date: '2026.08.10',
    readTime: '3 min read',
    image: IMAGES.journalFlatlay,
    excerpt: '입술 위에서 맑고 영롱하게 뿜어져 나오는 젤리 글로우 틴트와 하이라이터의 비밀스러운 믹스매치 조합을 공개합니다.',
    content: `
      ## 빛을 머금은 매력적인 립 레이어링

      AILÉE가 추구하는 아름다움은 인위적인 화려함이 아닙니다. 자연광과 은은한 조명 아래에서 스스로 빛을 발하는 입술이야말로 진짜 맑은 오라를 풍기죠.

      ### STEP 1. 부드러운 바탕 다지기
      건조하고 입술 각질이 많다면 **Dew Drop Glow Balm (01 Pure Dew)**를 메이크업 10분 전 살짝 얹어 각질을 불려준 뒤 부드럽게 닦아내세요.

      ### STEP 2. 투명한 색감의 시그니처 젤리 틴트
      **Jelly Glow Tint**의 원하는 컬러를 입술 중앙부터 톡톡 두드려 펼칩니다. 이때 입술을 세게 쿵쿵 음파하기보다 10초간 가만히 두어 오일 수분막이 솟아오르도록 기다려주는 것이 핵심입니다.

      ### STEP 3. 립산 위 투명 빔 포인트
      입술산 중앙과 아랫입술 가운데에 **Glass Veil Highlighter (01 Moon Glass)**를 손끝으로 살짝 콕 찍어주면 빛이 입술 위로 응축되는 듯한 볼륨감 넘치는 입술이 연출됩니다.
    `,
    relatedProductIds: ['jelly-glow-tint', 'glass-veil-highlighter', 'dew-drop-glow-balm']
  },
  {
    id: 'spring-dewy-look-2',
    title: 'Spring Bloom Look: 생화 라이트 핑크 이슬 메이크업',
    category: 'Seasonal Look',
    date: '2026.08.02',
    readTime: '4 min read',
    image: IMAGES.jellyTint,
    excerpt: '갓 피어난 생화의 부드럽고 맑은 촉촉함을 담아낸 10대~20대 맞춤 데일리 스페셜 메이크업 룩.',
    content: `
      ## 생화 피치 핑크로 표현하는 사랑스러움

      너무 진하거나 도터운 메이크업 대신, 내 피부 톤이 살포시 투영되는 투명 핑크 생기를 표현해보세요.

      **03 Pink Petal**과 **02 Peach Prism** 하이라이터의 꿀조합은 피부에 은은한 핑크 홀로그램을 입혀줍니다.

      1. 베이스 메이크업은 쿠션으로 얇고 가볍게 정돈합니다.
      2. **Dew Drop Glow Balm (03 Rosy Beam)**으로 양 볼 위 광대에 사선으로 자연스럽게 그라데이션합니다.
      3. **Jelly Glow Tint (03 Pink Petal)**을 입술 전체에 도포하여 맑은 꽃잎 입술을 완성합니다.
    `,
    relatedProductIds: ['jelly-glow-tint', 'dew-drop-glow-balm']
  },
  {
    id: 'cloud-mousse-tips-3',
    title: 'Cloud Velvet: 속건조 없는 실키 구름 블러립 레시피',
    category: 'Editor Choice',
    date: '2026.07.25',
    readTime: '3 min read',
    image: IMAGES.cloudMousse,
    excerpt: '매트립은 건조하다는 편견을 깬 클라우드 블러 립 무스로 부드럽고 몽환적인 립 메이크업을 연출하는 방법.',
    content: `
      ## 가볍고 몽환적인 스머징 메이크업

      입술 라인을 너무 또렷하게 그리기보다는, 핑거 팁으로 스머징하여 구름처럼 포근한 필터 효과를 느껴보세요.

      **Cloud Blur Lip Mousse (03 Rose Latte)**는 우유를 머금은 듯 차분하고 매력적인 오버립 라이닝을 도와줍니다.
    `,
    relatedProductIds: ['cloud-blur-lip-mousse']
  }
];
