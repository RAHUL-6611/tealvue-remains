import React from 'react'
import NavigationBox from '../components/NavigationBox';
import UpdateBox from '../components/UpdateBox';
import SearchBar from '../components/SearchBar';
import BottomNav from '../components/BottomNav';

const DashBoard = () => {
       const updates = [
         { text: 'Introducing the all new Expert Advice' },
         { text: 'Introducing the all new Expert Advice' },
         { text: 'Introducing the all new Expert Advice' },
         { text: 'Introducing the all new Expert Advice' },
    ];

    const items = [
      { title: 'DashBoard', leftIcon: 'speed', rightIcon: 'arrow', path: `DashBoard` },
      { title: 'Future', leftIcon: 'future', rightIcon: 'arrow', path: `future` },
      { title: 'Options', leftIcon: 'options', rightIcon: 'arrow', path: `option` },
      { title: 'Strategy', leftIcon: 'strategy', rightIcon: 'arrow', path: `option` },
      { title: 'Chart', leftIcon: 'chart', rightIcon: 'arrow', path: `future` },
      { title: 'Support', leftIcon: 'open-interest1', rightIcon: 'arrow', path: `future` },
      { title: 'Social Trading', leftIcon: 'trading', rightIcon: 'arrow', path: `future` },
      { title: 'Expert Advice', leftIcon: 'advice', rightIcon: 'arrow', path: `future` },
    ];
    
    return (
      <>
        <div className="p-2 flex flex-col gap-6 bg-gray-100 h-screen w-full overflow-hidden relative">
          <NavigationBox title="Select Options" leftIcon="arrow" rightIcon="dots-three" header />
          <UpdateBox updates={updates} />
          <SearchBar />
          <div className="grid grid-cols-2 gap-6 bg-gray-100">
            {items.map((item, i) => (
              <NavigationBox
                title={item.title}
                leftIcon={item.leftIcon}
                rightIcon={item.rightIcon}
                path={item.path}
                key={i}
              />
            
            ))
            }
          </div>
          <BottomNav />
        </div>
      </>
    );
}

export default DashBoard