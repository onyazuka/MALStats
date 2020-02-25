import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
  Accepts:
    defaultIndex
    containerAttributes
    tabsContainerAttributes
    tabAttributes
    itemAttributes
    tabs[array of objects] like:
      tab, item

*/
export default function Tab(props) {
  const { defaultIndex, containerAttributes, tabsContainerAttributes, tabAttributes, activeTabAttributes, itemAttributes, tabs } = props;
  // sets 0 on incorrect defaultIndex passed
  const [activeIndex, setActiveIndex] = useState(defaultIndex >= 0 && defaultIndex < tabs.length ? defaultIndex : 0);

  return (
    <div {...containerAttributes}>
      <div {...tabsContainerAttributes}>
        {
          tabs.map(
            (tab, index) => {
              const tabAttrs = (index === activeIndex) ? activeTabAttributes ? activeTabAttributes : tabAttributes : tabAttributes;
              return (
                <div 
                  {...tabAttrs} 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  { tab.tab }
                </div>
              );
            }
          )
        }
      </div>
      <div {...itemAttributes}>
        { tabs[activeIndex].item }
      </div>
    </div>
  );
};

Tab.propTypes = {
  defaultIndex: PropTypes.number,
  containerAttributes: PropTypes.object,
  tabsContainerAttributes: PropTypes.object,
  tabAttributes: PropTypes.object,
  activeTabAttributes: PropTypes.object,
  itemAttributes: PropTypes.object,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    tab: PropTypes.node.isRequired,
    item: PropTypes.node.isRequired,
  })),
};

Tab.defaultProps = {
  defaultIndex: 0,
};