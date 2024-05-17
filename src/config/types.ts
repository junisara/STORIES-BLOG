// Gatsby의 데이터에 맞는 타입지정
// 문서에 포함되어 있는 데이터 정보
export interface FrontMatter {
  title: string
  publish: string
  blogs?: {
    tistory: {
      regist: boolean
      name: string
    }
    blogger: {
      regist: boolean
      name: string
    }
  }
  taxonomy: {
    category: string
    tag: []
  }
  tistory?: {
    postId: string
    url: string
    published: string
    updated: string
  }
  blogger?: {
    driveFolderId: string
    postId: string
    url: string
    published: string
    updated: string
  }
  postId: string // 상세페이지 주소를 찾는 변수 2 (기존 티스토리의 데이터 활용)
  desc?: string
  thumbnail?: any
  datePublished: string // 처음 등록한(오픈한) 일자
  dateUpdated: string // 최근 수정한 일자
}

// gatsby.js에서 생성하는 데이터 정보
// graphql의 fields 항목에 생성됨
export interface EtcMatter {
  firstImageUrl: any // 본문에서 첫번째로 나온 이미지(썸네일 대용)
  currentCategory: string // 현재 카테고리
  readingMinutes: string //  읽는데 걸리는 예상 시간
}

// PostMatter를 참조해서 생성하는 데이터 정보
export interface Post {
  id: string
  frontmatter: FrontMatter
  fields: EtcMatter
  excerpt: string
  body: string
}

// Gatsby의 터압 아래는 아직 미지정..
//////////////////////

// 문서에 포함되어 있는 데이터 정보

// next.js에서 생성하는 데이터 정보
export interface PostAbstract {
  categoryPath: string // /_POSTS 폴더를 /category/로 대체한 폴더 부터 md파일이 들어있는 이전 폴더 경로까지
  categoryPublicName: string // 가장 마지막의 카테고리의 이름
  postPath: string // 주소창에서 접근할 수 있는 Post의 직접적인 주소
  // url: string; // 주소창에서 접근할 수 있는 Post의 직접적인 주소
  // slug: string; // 상세페이지 주소를 찾는 변수 1
  // 아래가 예제임
  /*************************** */
  // categoryPath: '/category/03.제품리뷰이야기',
  // categoryPublicName: '03.제품리뷰이야기',
  // url: '03.제품리뷰이야기/20230616_요즘 자동차 구매할때 호갱당하지 않는 방법', (*주의 : /category/ 없음)
  // slug: '20230616_요즘 자동차 구매할때 호갱당하지 않는 방법',
}

export interface CategoryDetail_backup {
  dirName: string
  publicName?: string
  count: number
}

export interface CategoryDetail {
  id: number
  dirName: string
  publicName: string
  count: number
  type: 'menu' | 'category' | 'item'
  parentId: number | null
  order: number
  url: string
  icon?: string
  children: CategoryDetail[]
  permissions?: string[]
  roles?: string[]
  metadata?: Record<string, any>
}

export interface HeadingItem {
  text: string
  link: string
  indent: number
}
