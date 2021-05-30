const prompt = require('inquirer').createPromptModule();
const concurrently = require('concurrently');

const { backend, PROTOCOLS } = require('./constants');
const { action } = require('./webpack');

const QUESTIONS = {
    TARGET_ENDPOINT: 'targetEndpoint',
    PROTOCOL: 'protocol',
    CUSTOM_PROTOCOL: 'customProtocol',
    HOST: 'host',
};

const CUSTOM_PROTOCOL_CHOISE = 'custom protocol';
const CUSTOM_TARGET_CHOISE = 'custom target';

const VALIDATION_PATTERNS = {
    HOST_STRUCTURE: /^(?!\w+:\/\/).+\.\w{2,}$/,
    PROTOCOL_CASE: /^[a-z]+$/,
};
const VALIDATION_ERROR_MESSAGES = {
    WRONG_HOST: `Host shouldn't contain protocol or trailing slash`,
    EMPTY_HOST: `Host shouldn't be empty`,
    WRONG_PROTOCOL: `Protocol should contain only lower case letters`,
    EMPTY_PROTOCOL: `Protocol shouldn't be empty`,
}

const checkIsCustomTarget = ({ targetEndpoint }) => targetEndpoint === CUSTOM_TARGET_CHOISE;
const checkIsCustomProtocol = ({ protocol }) => protocol === CUSTOM_PROTOCOL_CHOISE;
const backOptions = Object.keys(backend).map( el => ({
    name: `${el.toUpperCase()}: ${backend[el].host}`,
    value: el,
}));

const promptQuestions = [
    {
        type: 'list',
        name: QUESTIONS.TARGET_ENDPOINT,
        message: 'Select backend api target:',
        choices: [...backOptions, CUSTOM_TARGET_CHOISE],
    },
    {
        when: checkIsCustomTarget,
        type: 'list',
        name: QUESTIONS.PROTOCOL,
        message: 'Chose connection protocol',
        choices: [...Object.values(PROTOCOLS), CUSTOM_PROTOCOL_CHOISE],
        default: PROTOCOLS.HTTPS,
    },
    {
        when: checkIsCustomProtocol,
        type: 'input',
        name: QUESTIONS.CUSTOM_PROTOCOL,
        message: 'Enter custom protocol',
        validate: enteredProtocol => {
            if (!enteredProtocol) {
                return VALIDATION_ERROR_MESSAGES.EMPTY_PROTOCOL;
            }
            if (!VALIDATION_PATTERNS.PROTOCOL_CASE.test(enteredProtocol)) {
                return VALIDATION_ERROR_MESSAGES.WRONG_PROTOCOL;
            }

            return true;
        }
    },
    {
        when: checkIsCustomTarget,
        type: 'input',
        name: QUESTIONS.HOST,
        message: 'Enter custom api host',
        validate: enteredHost => {
            if (!enteredHost) {
                return VALIDATION_ERROR_MESSAGES.EMPTY_HOST;
            }
            if (!VALIDATION_PATTERNS.HOST_STRUCTURE.test(enteredHost)) {
                return VALIDATION_ERROR_MESSAGES.WRONG_HOST;
            }

            return true;
        }
    },
];

const getCustomEndpoint = answers => {
    const protocol = answers[QUESTIONS.PROTOCOL] === CUSTOM_PROTOCOL_CHOISE
        ? answers[QUESTIONS.CUSTOM_PROTOCOL]
        : answers[QUESTIONS.PROTOCOL]

    return {
        protocol,
        host: answers[QUESTIONS.HOST],
    }
};
const getDefinedEndpoint = endpoint => backend[endpoint];

prompt(promptQuestions).then((answers) => {
    const targetEndpoint = answers[QUESTIONS.TARGET_ENDPOINT] === CUSTOM_TARGET_CHOISE
        ? getCustomEndpoint(answers)
        : getDefinedEndpoint(answers[QUESTIONS.TARGET_ENDPOINT]);

    const isLocal = targetEndpoint.host === backend.local.host;

    if (isLocal) {
        concurrently(
            ['ts-node-dev ./config/dev-backend'],
            {
                killOthers: ['failure', 'success'],
            }
        );
    }

    action(targetEndpoint);
});
