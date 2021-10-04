import { loadNav, loadPage } from './nav';
import { loadTeamDetail } from './content';

const main = () => {
  const urlPath = window.location.pathname.substr(1);
  
  if (urlPath === '' || urlPath === 'index.html') {
    const sidenav = document.querySelectorAll('#nav-mobile');
    M.Sidenav.init(sidenav);
    loadNav();

    let page = window.location.hash.substr(1);
    if (page === '') page = 'home';
    loadPage(page);
  } else if (urlPath === 'team.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    
    loadTeamDetail(idParam);
  }
}

export default main;
