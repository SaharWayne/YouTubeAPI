import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'YouTubeAPI';
  tabsActivity = { search: true, direct: false }
  lastActiveTabKey = 'search';

  isTabActive(tabKey: string) {
    return this.tabsActivity[tabKey];
  }

  activateTab(tabKey: string) {
    if (tabKey in this.tabsActivity && tabKey !== this.lastActiveTabKey) {
      this.tabsActivity[this.lastActiveTabKey] = false;
      this.tabsActivity[tabKey] = true;

      const lastActiveTabElement = document.getElementById(this.lastActiveTabKey);
      const lastActiveTabComponentElement = document.getElementById(this.lastActiveTabKey + '_comp');
      const newActiveTabElement = document.getElementById(tabKey);
      const newActiveTabComponentElement = document.getElementById(tabKey + '_comp');

      lastActiveTabElement.classList.remove('tab-active');
      lastActiveTabComponentElement.classList.remove('visible');
      lastActiveTabElement.classList.add('tab-inactive');
      lastActiveTabComponentElement.classList.add('invisible');
      newActiveTabElement.classList.remove('tab-inactive');
      newActiveTabComponentElement.classList.remove('invisible');
      newActiveTabElement.classList.add('tab-active', 'visible');
      newActiveTabComponentElement.classList.add('visible');

      this.lastActiveTabKey = tabKey;
    }
  }

}
