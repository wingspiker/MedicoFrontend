import React from 'react';

const Welcome = (props) => {
  const { changeLogin } = props;

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <div className="flex-1">
        {/* ...rest of your welcome page content */}
      </div>
    </div>
  );
};

export default Welcome;
