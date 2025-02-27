console.log("Extracting data from the original page...");
// Step 1: Extract necessary data from the original page
const online = document.getElementById('online').innerText.trim();
const hockeyTeam = document.getElementById('right_menu_hockey_team');
const footballTeam = document.getElementById('right_menu_soccer_team');
const handballTeam = document.getElementById('right_menu_handball_team');
const basketballTeam = document.getElementById('right_menu_basketball_team');

const profileName = document.getElementById('nick').innerText;
const profileLink = document.querySelector("#top_submenu_user > div > ul > li:nth-child(1) > a").href

const hockeyTeamName = document.querySelector('div.hockey_team_info > div.sport_me_team_name').innerText;
const footballTeamName = document.querySelector('div.soccer_team_info > div.sport_me_team_name').innerText;
const handballTeamName = document.querySelector('div.handball_team_info > div.sport_me_team_name').innerText;
const basketballTeamName = document.querySelector('div.basketball_team_info > div.sport_me_team_name').innerText;

const credits = document.querySelector('div.top_info_pro > div.top_info_pro_status > span').innerText.split(' ')[0];

const articleTitles = document.querySelectorAll('a.article_title');
const articleTitlesEdited = Array.from(articleTitles).map(title=> {
  return {
    text:title.innerText,
    href:title.href
  }
  } 
)
const articleFooters = document.querySelectorAll('div.article_footer');
const articleFootersEdited = Array.from(articleFooters).map(footer=>footer.innerText);

const czNum = document.querySelector('div.column_right > div:nth-child(2) > table > tbody > tr.tr1 > td:nth-child(4) > a').innerText;
const skNum = document.querySelector('div.column_right > div:nth-child(2) > table > tbody > tr.tr0 > td:nth-child(4) > a').innerText;
const plNum = document.querySelector('div.column_right > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a').innerText;
const favDisTable = document.querySelector('#favorite_topic_list > table > tbody');
const favDisArr = Array.from(favDisTable.querySelectorAll('tr'))
const favDisData = favDisArr.map(tr=>{
  return {
    class: tr.className,
    flag: tr.querySelectorAll('td')[0].querySelector('img').title,
    icon: tr.querySelectorAll('td')[1].querySelector('img').src,
    text: tr.querySelectorAll('td')[2].innerText,
    title: tr.querySelectorAll('td')[2].querySelector('a').title,
    href: tr.querySelectorAll('td')[2].querySelector('a').href,
    number: tr.querySelectorAll('td')[3].innerText
  };
});
const lastDisTable = document.querySelector('#last_topic_list > table > tbody');
const lastDisArr = Array.from(lastDisTable.querySelectorAll('tr'))
const lastDisData = lastDisArr.map(tr=>{
    return {
      class: tr.className,
      flag: tr.querySelectorAll('td')[0].querySelector('img').title,
      icon: tr.querySelectorAll('td')[1].querySelector('img').src,
      text: tr.querySelectorAll('td')[2].innerText,
      title: tr.querySelectorAll('td')[2].querySelector('a').title,
      href: tr.querySelectorAll('td')[2].querySelector('a').href,
      number: tr.querySelectorAll('td')[3].innerText
    };
});

// Step 2: Replace page with custom HTML
fetch(chrome.runtime.getURL('domov.html'))
  .then(response => response.text())
  .then(html => {
    document.documentElement.innerHTML = html;
      // Update content from extracted one
      document.getElementById('online').innerText = online;
      // Info teams
      let myTeams='';
      let createTeams='';   
      if(!hockeyTeam){
        document.getElementById('sn-hockey').style.display = 'none';
        createTeams += '<a href="https://ppm.powerplaymanager.com/cs/vytvorit-tym.html?data=hockey" title="Vytvoř si hokejový tým!"><img src="/images/top_sport_icon_hockey.png"></a>&nbsp;';
        document.getElementById('hockey-action').innerText = 'Vytvoř si tým!';
      }else{
        myTeams += `<a href="https://hockey.powerplaymanager.com/cs/hokejove-novinky.html" title="${hockeyTeamName} (Hokej)"><img src="/images/top_sport_icon_hockey.png"></a>&nbsp;`;
        document.getElementById('hockey-action').innerText = 'Vstup do týmu';
      };
      if(!footballTeam){
        document.getElementById('sn-football').style.display = 'none';
        createTeams+= '<a href="https://ppm.powerplaymanager.com/cs/vytvorit-tym.html?data=soccer" title="Vytvoř si fotbalový tým!"><img src="/images/top_sport_icon_soccer.png"></a>&nbsp;';
        document.getElementById('football-action').innerText = 'Vytvoř si tým!';
      } else{
        myTeams += `<a href="https://soccer.powerplaymanager.com/cs/fotbalove-novinky.html" title="${footballTeamName} (Fotbal)"><img src="/images/top_sport_icon_soccer.png"></a>&nbsp;`;
        document.getElementById('football-action').innerText = 'Vstup do týmu';
      }
      if(!handballTeam){
        document.getElementById('sn-handball').style.display = 'none';
        createTeams += '<a href="https://ppm.powerplaymanager.com/cs/vytvorit-tym.html?data=handball" title="Vytvoř si házenkařský tým!"><img src="/images/top_sport_icon_handball.png"></a>&nbsp;';
        document.getElementById('handball-action').innerText = 'Vytvoř si tým!';
      } else {
        myTeams += `<a href="https://handball.powerplaymanager.com/cs/hazenkarske-novinky.html" title="${handballTeamName} (Házená)"><img src="/images/top_sport_icon_handball.png"></a>&nbsp;`;
        document.getElementById('handball-action').innerText = 'Vstup do týmu';
      }
      if(!basketballTeam){
        document.getElementById('sn-basketball').style.display = 'none';
        createTeams += '<a href="https://ppm.powerplaymanager.com/cs/vytvorit-tym.html?data=basketball" title="Vytvoř si basketbalový tým!"><img src="/images/top_sport_icon_basketball.png"></a>&nbsp;';
        document.getElementById('basketball-action').innerText = 'Vytvoř si tým!';
      }else{
        myTeams += `<a href="https://basketball.powerplaymanager.com/cs/basketbalove-novinky.html" title="${basketballTeamName} (Basketbal"><img src="/images/top_sport_icon_basketball.png"></a>&nbsp;`;
        document.getElementById('basketball-action').innerText = 'Vstup do týmu';
      }

      if(!myTeams){
        document.getElementById('my-teams-title').style.display = 'none';
      };
      if(!createTeams){
        document.getElementById('create-teams-title').style.display = 'none';
      };
      // Info teams and main teams
      document.getElementById('profile-name').innerText = profileName;
      document.getElementById('profile-link').href = profileLink;
      document.getElementById('my-teams').innerHTML = myTeams;
      document.getElementById('create-teams').innerHTML = createTeams;
      document.getElementById('credits').innerText = credits;
      document.getElementById('hockey-name').innerText = hockeyTeamName;
      document.getElementById('football-name').innerText = footballTeamName;
      document.getElementById('handball-name').innerText = handballTeamName;
      document.getElementById('basketball-name').innerText = basketballTeamName;
      // Articles
      document.getElementById('article-title-1').innerText = articleTitlesEdited[0].text;
      document.getElementById('article-title-1').href = articleTitlesEdited[0].href;
      document.getElementById('article-title-2').innerText = articleTitlesEdited[1].text;
      document.getElementById('article-title-2').href = articleTitlesEdited[1].href;
      document.getElementById('article-title-3').innerText = articleTitlesEdited[2].text;
      document.getElementById('article-title-3').href = articleTitlesEdited[2].href;
      document.getElementById('article-footer-1').innerText = articleFootersEdited[0];
      document.getElementById('article-footer-2').innerText = articleFootersEdited[1];
      document.getElementById('article-footer-3').innerText = articleFootersEdited[2];
      // Right column
      document.getElementById('czNum').innerText = czNum;
      document.getElementById('skNum').innerText = skNum;
      document.getElementById('plNum').innerText = plNum;

      let favDisInner = '';
      for(let i=0; i<favDisData.length; i++){
        let rowClass;
        let rowFlag;
        let rowIcon;
        if(favDisData[i].class.includes('sticky')){
          rowClass = 'row-highlighted-dark';
        } else if(i % 2 == 0){
          rowClass = 'row-odd';
        } else {
          rowClass = '';
        };
        // COULD ADD MORE FLAGS AND ICONS LATER
        switch(favDisData[i].flag){
          case 'Česká republika': rowFlag='/images/cze.png'; break
          case 'Slovensko': rowFlag='/images/svk.png'; break
          case 'Polsko': rowFlag='/images/pol.png'; break
          default: rowFlag='images/international.png'
        }
        if(favDisData[i].icon.includes('hockey')){
          rowIcon = 'images/hockey.gif';
        } else {
          rowIcon = 'images/general.gif'
        };
        favDisInner += 
        `<tr class="${rowClass}">
          <td class="col-flag left"><img src="${rowFlag}" title="${favDisData[i].flag}"></td>
          <td class="col-small left"><img src="${rowIcon}"></td>
          <td class="left"><a title="${favDisData[i].title}" href="${favDisData[i].href}">${favDisData[i].text}</a></td>
          <td class="right col-num-disc">${favDisData[i].number}</td>
        </tr>`;
      };
      let lastDisInner = '';
      for(let i=0; i<lastDisData.length; i++){
        let rowClass;
        let rowFlag;
        let rowIcon;
        let numberClass = 'right col-num-disc';//only in last dis
        if(lastDisData[i].class.includes('sticky')){
          rowClass = 'row-highlighted-dark';
        } else if(i % 2 == 0){
          rowClass = 'row-odd';
        } else {
          rowClass = '';
        };
        // COULD ADD MORE FLAGS AND ICONS LATER
        switch(lastDisData[i].flag){
          case 'Česká republika': rowFlag='/images/cze.png'; break
          case 'Slovensko': rowFlag='/images/svk.png'; break
          case 'Polsko': rowFlag='/images/pol.png'; break
          default: rowFlag='images/international.png'
        }
        if(lastDisData[i].icon.includes('hockey')){
          rowIcon = 'images/hockey.gif';
        } else {
          rowIcon = 'images/general.gif'
        };
        if(lastDisData[i].number.includes('NEW')){
          numberClass += ' red-new';
        };

        lastDisInner += 
        `<tr class="${rowClass}">
          <td class="col-flag left"><img src="${rowFlag}" title="${lastDisData[i].flag}"></td>
          <td class="col-small left"><img src="${rowIcon}"></td>
          <td class="left"><a title="${lastDisData[i].title}" href="${lastDisData[i].href}">${lastDisData[i].text}</a></td>
          <td class="${numberClass}">${lastDisData[i].number}</td>
        </tr>`;
      };
      document.getElementById('fav-dis').innerHTML = favDisInner;
      document.getElementById('last-dis').innerHTML = lastDisInner;

      // Step 3: Update CSS link tag href attributes (if relative) using chrome.runtime.getURL
      let linkTags = document.querySelectorAll('link[rel="stylesheet"]');
      linkTags.forEach(link => {
      let href = link.getAttribute('href');
      if (href && !href.startsWith('http')) { // If the href is relative
          link.setAttribute('href', chrome.runtime.getURL(href)); // Update href to the full extension path
      }
      });

      // Step 4: Update image URLs in the new HTML
      let images = document.querySelectorAll('img');
      images.forEach(img => {
      let src = img.getAttribute('src');
      if (src && !src.startsWith('http')) { // If the src is relative
          img.setAttribute('src', chrome.runtime.getURL(src)); // Update src with extension URL
      }
      });
        // Step 5: Update script tag src attributes (if relative) using chrome.runtime.getURL
        let scriptTags = document.querySelectorAll('script');
        scriptTags.forEach(script => {
          let src = script.getAttribute('src');
          if (src && !src.startsWith('http') && !src.startsWith('chrome-extension://')) { // If the src is relative
            // Create a new script tag with the updated src
            let newScript = document.createElement('script');
            newScript.src = chrome.runtime.getURL(src); // Set the updated src from extension
            newScript.async = true; // Optional: To ensure non-blocking loading
            document.head.appendChild(newScript); // Add the new script to the head of the document
            script.remove(); // Optionally remove the old script tag
          }
        });
  })
  .catch(error => console.error('Error replacing page:', error));


