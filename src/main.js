const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const lastContent = localStorage.getItem("lastContent");
const lastContentObject = JSON.parse(lastContent);
const hashMap = lastContentObject || [
  {
    logo: "https://github.com/favicon.ico",
    url: "https://github.com/",
  },
  {
    logo: "https://www.v2ex.com/favicon.ico",
    url: "https://www.v2ex.com/",
  },
  {
    logo: "https://cn.vuejs.org/images/logo.svg",
    url: "https://cn.vuejs.org/",
  },
  {
    logo: "https://www.jquery123.com/assets/images/favicon.ico",
    url: "https://www.jquery123.com/",
  },
  {
    logo: "https://reactjs.org/favicon.ico",
    url: "https://reactjs.org/",
  },
  {
    logo: "https://css-tricks.com/favicon.ico",
    url: "https://css-tricks.com/",
  },
  {
    logo: "https://caniuse.com/img/favicon-128.png",
    url: "https://caniuse.com/",
  },
  {
    logo: "https://wangdoc.com/javascript/assets/icons/favicon-32x32.png",
    url: "https://wangdoc.com/javascript/",
  },
  {
    logo: "https://juejin.cn/favicon.ico",
    url: "https://juejin.cn/",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo"><img src="${node.logo}"  alt="" class="img"></div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>      
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
    logo = url + "/favicon.ico";
  }
  hashMap.push({
    logo: logo,
    url: url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("lastContent", string);
};
