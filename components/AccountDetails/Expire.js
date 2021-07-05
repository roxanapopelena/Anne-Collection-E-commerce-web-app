import React, { useEffect, useState } from "react";

/*
* Simple Component that created a div with a timeout that can be populated using props.
* Accept a delay prop that sets the visibility time of the component.
*
* Implemented within the edit_account components.
*/

const Expire = props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? <div>{props.children}</div> : <div />;
};

export default Expire;