export const getAllErrorMessages = (errors: any): string[] => {
    const messages: string[] = [];

    const traverse = (err: any) => {
        if (!err) return;

        if (typeof err.message === 'string') {
            messages.push(err.message);
        }

        if (typeof err === 'object') {
            Object.values(err).forEach(traverse);
        }
    };

    traverse(errors);
    return messages;
};


export const getFirstErrorPath = (errors: any, parentPath = ''): string | null => {
    for (const key of Object.keys(errors)) {
        const value = errors[key];
        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (value?.message) {
            return currentPath;
        }

        if (typeof value === 'object') {
            const nestedPath = getFirstErrorPath(value, currentPath);
            if (nestedPath) return nestedPath;
        }
    }

    return null;
};
