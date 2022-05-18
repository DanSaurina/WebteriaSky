import React, { useState } from "react";

function Presets() {
  const [value, setValue] = useState("lime");



  return (
    <div className="Preset">
     
        <label>
          Pick your favorite flavor:
          <select value={value} onChange={e => setValue(e.target.value)}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
      
    </div>
  );
}

export default Presets;
