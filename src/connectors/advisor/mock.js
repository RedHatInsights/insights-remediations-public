'use strict';

const DATA = {
    'bond_config_issue|BOND_CONFIG_ISSUE': {
        id: 'bond_config_issue|BOND_CONFIG_ISSUE',
        description: 'Unexpected bonding behavior with incorrect syntax in bond configuration files'
    },

    'alias_interface_invalid|ALIAS_INTERFACE_INVALID': {
        id: 'alias_interface_invalid|ALIAS_INTERFACE_INVALID',
        description: 'Interface enabled at boot-time when ONBOOT parameter is disabled in configuration file'
    }
};

exports.getRule = async function (id) {
    if (DATA[id]) {
        return DATA[id];
    }

    return null;
};

