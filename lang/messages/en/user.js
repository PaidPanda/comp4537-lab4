const STRINGS = {
    fail: "Warning! This word already exists in the dictionary. Nothing was added.",
    successGet: "Request #${requestCount}, Word: '${word}' - Definition: '${definition}'.",
    successPost: "Request #${requestCount}, New entry recorded: '${word}' : '${definition}'. Total number exisiting entries: ${size}",
    invalidWord: "Invalid input for word. Please provide a non-empty string.",
    invalidDefinition: "Invalid input for definition. Please provide a non-empty string.",
    invalidJSON: "Invalid JSON body.",
    error: "Request #${requestCount}, word '${word}' not found in the dictionary.",
}

module.exports = STRINGS;