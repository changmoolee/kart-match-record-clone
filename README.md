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
<pre><code>npm start</code></pre><br>
