import React, { FC, ReactElement, useState } from "react";
type ChildProps = {
    name: string,
    id: number,
    bio?: string,
  }
  const Child: FC<{ initialClick?: number }> = ({ initialClick = 0 }): ReactElement => {
    const [click, setClick] = useState(initialClick);
    return (
      <div>
        <p>Click: {click}</p>
        <button onClick={() => setClick(click + 1)}>Click Me!</button>
      </div>
    )
  };
  export default Child;