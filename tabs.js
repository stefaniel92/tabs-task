window.addEventListener('DOMContentLoaded', () => {
    const tabLists = document.querySelectorAll('[role="tablist"]');
    
    //Loop through each tablist so you can have multiple on a page
    tabLists.forEach(function(tabList){
        const tabs = tabList.querySelectorAll('[role="tab"]');

        tabs.forEach((tab) => {
            tab.addEventListener('click', changeTabs);
          });

        // Enable arrow navigation between tabs in the tab list
        let tabFocus = 0;
    
        tabList.addEventListener('keydown', (e) => {
            //Check if key pressed was right or left key
            if (e.keyCode === 39 || e.keyCode === 37) {
                // Move right
                tabs[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    // If we're at the end, go to the start
                    if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                    }
                // Move left
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    // If we're at the start, move to the end
                    if (tabFocus < 0) {
                        tabFocus = tabs.length - 1;
                    }
                }
        
                tabs[tabFocus].setAttribute('tabindex', 0);
                tabs[tabFocus].focus();
            }

        });
    })
  
  });
  
  function changeTabs(e) {
    const targetTab = e.target;
    const parent = targetTab.parentNode;
    const grandparent = parent.parentNode;

  
    // Remove all current selected tabs
    parent
      .querySelectorAll('[aria-selected="true"]')
      .forEach((tab) => tab.setAttribute('aria-selected', false));
  
    // Set this tab as selected
    targetTab.setAttribute('aria-selected', true);
  
    // Hide all tab panels
    grandparent
      .querySelectorAll('[role="tabpanel"]')
      .forEach((panel) => panel.setAttribute('hidden', true));
  
    // Show the selected panel
    grandparent.parentNode
      .querySelector(`#${targetTab.getAttribute('aria-controls')}`)
      .removeAttribute('hidden');
  }

