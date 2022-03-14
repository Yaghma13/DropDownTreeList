import React, { useMemo, useState } from 'react';
import TreeNode from "./TreeNode";

export default function Tree({ data }) {
    let checkList = [], openList = [];
    const initialValues = (nodes) => {
        nodes.map((node) => {
            checkList[node.id] = 0;
            openList[node.id] = false;
            node.children.length > 0 && initialValues(node.children);
            return null;
        });
        return [checkList, openList];
    };

    const [check, setCheck] = useState(initialValues(data)[0]);
    const open = useMemo(() => initialValues(data)[1], [data]);

    const handleOpen = (id) => {
        open.splice(id, 1, !open[id]);
    }

    let tempCheck = [...check];
    const toggleCheck = (node, indeterminate = -1, idx = -1, parentLength = -1, parents = null) => {
        let newCheckState;
        if (indeterminate !== -1) newCheckState = indeterminate;
        else newCheckState = (check[node.id] + 1) % 2;
        tempCheck.splice(node.id, 1, newCheckState);
        setCheck(tempCheck);
        node.children.length > 0 && node.children.map(
            (child, index) =>
                (tempCheck[node.id] !== tempCheck[child.id] && tempCheck[node.id] !== 2) && toggleCheck(child, -1, index, node.children.length));
        parents !== null && (idx === parentLength) && overallCheck(parents);
    }

    const overallCheck = (nodes) => {
        for (let parent of nodes) {
            let temp = check[parent.id];
            if (parent.children.length > 0) {
                parent.children.every(child => tempCheck[child.id] === 1) && tempCheck[parent.id] !== 1 && toggleCheck(parent);
                parent.children.every(child => tempCheck[child.id] === 0) && tempCheck[parent.id] !== 0 && toggleCheck(parent, 0);
                !parent.children.every(child => tempCheck[child.id] === 1) && parent.children.some(child => tempCheck[child.id] !== 0) && tempCheck[parent.id] !== 2 && toggleCheck(parent, 2);
            }
            if (temp === tempCheck[parent.id]) break;
        }
    }

    const makeTree = (nodes, parents) => {
        return nodes.map(node => {
            return (
                <TreeNode
                    key={node.id}
                    label={node.label}
                    check={check[node.id]}
                    open={open[node.id]}
                    openId={node.id}
                    handleOpen={handleOpen}
                    make={makeTree}
                    next={[node, node.children, [...parents]]}
                    onCheck={toggleCheck}
                />
            )
        })
    }

    return (
        <div className="tree">
            {makeTree(data, [])}
        </div>
    )
}
