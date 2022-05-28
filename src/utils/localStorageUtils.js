export function setAuthority(payload) {
    localStorage.setItem('currentAuthority', payload.currentAuthority);
    localStorage.setItem('user', payload.userName);
    localStorage.setItem('ownAreas', payload.ownAreas);
    localStorage.setItem('currentSubstation', JSON.stringify(payload.currentSubstation));
    localStorage.setItem('substationList', JSON.stringify(payload.substationList));
  }
  
export function setLocalSettings( settings ) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export function getLocalSettings() {
 let settings = localStorage.getItem('settings') || '{}';
 return JSON.parse(settings);
}