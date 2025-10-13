const STRINGS = {
    fail: "Warning! This word already exists in the dictionary. Nothing was added.",
    successGet: "Word: '${word}' - Definition: '${definition}'. Request #${requestCount}",
    successPost: "Request #${requestCount}. New entry recorded: '${word}' : '${definition}'. Total number exisiting entries: ${size}",
    invalidWord: "Invalid input for word. Please provide a non-empty string.",
    invalidDefinition: "Invalid input for definition. Please provide a non-empty string.",
    invalidJSON: "Invalid JSON body.",
    error: "Word '{1}' not found in the dictionary.",
}

module.exports = STRINGS;