import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function TreeNode({ label, check, open, openId, handleOpen, make, next, onCheck }) {
    const [show, setShow] = useState(open);

    const handleExpand = () => {
        setShow(!show);
        handleOpen(openId);
    }

    return (
        <div className={`tree-node ${!next[1].length > 0 ? "leaf" : ''}`}>
            <div className="node">
                {next[1].length > 0 && <span className="span-tree" onClick={handleExpand}>{show === false ? <ChevronRightIcon /> : <ExpandMoreIcon />}</span>}
                <Checkbox
                    checked={check === 1}
                    indeterminate={check === 2}
                    onChange={() => onCheck(next[0], -1, -1, -1, next[2])}
                />
                {label}
            </div>
            {show === true && make(next[1], [next[0], ...next[2]])}
        </div>
    )
}
