<h1>clone: 카트라이더 매치 기록 검색사이트 </h1>


### 작성자 배포 url
https://kart-match-record-clone.netlify.app/
<br><br>
### 원본 url(클론 대상)
https://tmi.nexon.com/kart/user?nick=BBEESSTT&matchType=indi
<br><br>
## 자세한 실행 방법
<br>
1. 해당 프로젝트를 개인 로컬환경에서 실행하기 위해서는, nexon 사이트 가입 후 API Key 발급이 필요합니다.<br>
https://developers.nexon.com/kart 에서 가입 및 로그인 후, 마이페이지에서 API Key를 발급 받습니다.<br><br>
2. git clone 명령어를 통해 로컬에 git 저장소를 복제합니다.
<pre><code>git clone https://github.com/changmoolee/kart-match-record-clone.git</code></pre><br>
3. 다운 받은 폴더로 이동합니다.
<pre><code>cd kart-match-record-clone</code></pre><br>
4. 환경변수 설정을 위해 .env 파일을 생성하고, 아래와 같이 발급받은 Api Key를 작성한 뒤, .env 파일을 저장합니다.<pre><code>REACT_APP_API_KEY = 발급 받은 API Key</code></pre><br>
5. npm install 명령어를 입력하여 모듈들을 다운로드합니다.
<pre><code>npm install</code></pre><br>
6. npm start 명령어를 입력하여 실행합니다.
<pre><code>npm start</code></pre><br><br>

## 사이트 기능 <br>
### 개요 : 닉네임을 검색을 통한 전적 데이터 확인
1. 전적 데이터를 개인전/팀전을 구분 지어 확인할 수 있습니다.
2. 리타이어 전적 노출 여부를 정한 뒤, 필터링된 전적 데이터를 확인할 수 있습니다.
3. 자신의 최근 100경기(매치)의 순위 변동 추이를 그래프로 확인할 수 있습니다.
4. 자신의 최근 100경기(매치)데이터를 확인할 수 있습니다.
5. 각 경기(매치)의 toggle을 눌러, 참여 플레이어들의 순위, 카트바디, 유저, 기록를 확인할 수 있습니다.

## 프로젝트 구조
<pre><code>
├── node_modules <br>
├── package.json <br>
├── package-lock.json <br>
├── .env <br>
├── README.md <br>
├── public <br>
│   ├── favicon.ico <br>
│   └── index.html <br>
└── src <br>
    ├── App.js <br> 
    ├── components <br>
    │   ├── AlertModal.js <br>
    │   ├── Cheering.js <br>
    │   ├── convert.js <br>
    │   ├── Drawer.js <br>
    │   ├── Footer.js <br>
    │   ├── Header.js <br>
    │   ├── Info.js <br>
    │   ├── Left.js <br>
    │   ├── Loading.js <br>
    │   ├── MatchDetail.js <br>
    │   ├── MatchDetailContent.js <br>
    │   ├── Nav.js <br>
    │   ├── Others.js <br>
    │   ├── Profile.js <br>
    │   ├── Rank.js <br>
    │   ├── RankGraph.js <br>
    │   ├── Record.js <br>
    │   ├── ReportModal.js <br>
    │   ├── Right.js <br>
    │   ├── SkeletonUI.js <br>
    │   ├── Stats.js <br>
    │   ├── Tabs.js <br>
    │   ├── Toggle.js <br>
    │   ├── TrackGraph.js <br>
    │   └── VSanimation.js <br>
    ├── data <br>
    │   └── gameType.json <br>
    ├── hooks <br>
    │   └── InfiniteScroll.js <br>
    ├── pages <br>
    │   └── Main.js <br>
    ├── redux <br>
    │   └── store.js <br>
    ├── services <br>
    │   ├── Match.js <br>
    │   └── user.js <br>
    ├── styles <br>
    │   └── GlobalStyle.js <br>
    ├── App.js <br>
    ├── index.js <br>
    └── reportWebVitals.js <br>
</code></pre>
