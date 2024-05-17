---
title: 티스토리 스킨 제작 할 때 이미지 크기 최적화 하는 방법
blogName: stories
publish: published
taxonomy:
  category: 블로그이야기
  tag:
    - 블로그이야기
    - 블로그운영
    - blog
    - 티스토리
    - 티스토리스킨
tistory:
  postId: '451'
  url: 'https://blog.stories.pe.kr/451'
  published: '2020. 5. 6. 오후 6:35:39'
  updated: '2020. 5. 6. 오후 6:49:41'
postId: '451'
datePublished: '2020-05-06T18:35:39+09:00'
dateUpdated: '2020-05-06T18:49:41+09:00'
---






티스토리 스킨을 제작하다보면 블로그 주인의 프로필 이미지나 댓글 작성자의 프로필 이미지 또는 리스트를 보여줄 때 썸네일 이미지를 사용해야 하는 경우가 있습니다. 
그럴 때 그냥 이미지를 불러올 경우 원본크기의 이미지를 불러오기 때문에 페이지 로딩속도가 무지하게 느려지는 경우가 있습니다. 
이럴 때 티스토리 서버측에서 원하는 이미지 크기로 줄여서 네트워크로 보내주는 기능이 있습니다. 잘 활용하면 블로그의 빠른 로딩이 가능해 집니다. 

## 사용방법
 사용방법은 간단합니다. 이미지 경로명 앞에 `//i1.daumcdn.net/thumb/C50x50/?fname=[이미지 경로]` 를 붙혀주면 됩니다. 
해당 코드 중간에 있는 `C50x50`의 크기대로 서버에서 이미지를 잘라서 보내줍니다. 
원본 이미지의 크기가 가로 X 세로가 900px X 900px인데 보여줄 크기가 90px X 90px 크기라면 `C90x90`이라고 수정해서 사용하면 됩니다. 


## 사용 예시  

```html
<img src="//i1.daumcdn.net/thumb/C90x90/?fname=[##_rp_rep_logo_##]" class="img_profile" alt="프로필사진">  

```

```html
<img src="//i1.daumcdn.net/thumb/C90x90/?fname=https://tistory1.daumcdn.net/tistory/user/[유저아이디]/profile/profileImg" class="img_profile" alt="프로필사진">  
```


이렇게 사용하면 커다란 크기의 이미지를 서버측에서 크기를 90px X 90px로 줄여서 보내줍니다. 그렇게 되면 당연히 네트워크 대역폭이 줄어서 블로그 화면의 로딩속도가 빨라지게 됩니다. 

