import React from 'react';
import { Tooltip } from 'antd';
import { ToolTipProps } from '../../types/ToolTip.type';

const ToolTipIcon: React.FC<ToolTipProps> = ({ title, icon: Icon }) => (
    <Tooltip placement='top' title={title}>
        <Icon />
    </Tooltip>
);

export default ToolTipIcon;