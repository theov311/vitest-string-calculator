export function add(numbersStr) {
    if (!numbersStr) return 0;

    let delimiter = /,|\n/; // Délimiteurs par défaut
    let numbers = numbersStr;

    // Gestion des délimiteurs
    const customDelimiterMatch = numbersStr.match(/^\/\/(.+)\n/);
    if (customDelimiterMatch) {
        let customDelimiter = customDelimiterMatch[1];

        if (customDelimiter.startsWith("[") && customDelimiter.endsWith("]")) {
            // Cas de plusieurs délimiteurs ou d'un délimiteur multi-caractères
            const delimiters = [...customDelimiter.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
            delimiter = new RegExp(delimiters.map(d => escapeRegExp(d)).join("|"));
        } else {
            // Cas d'un seul délimiteur simple
            delimiter = new RegExp(escapeRegExp(customDelimiter));
        }
        // Supprimer l'entête `//...`
        numbers = numbersStr.slice(customDelimiterMatch[0].length);
    }

    if (numbers.includes(",\n") || numbers.includes("\n,")) {
        throw new Error("Format incorrect : une virgule ne peut pas précéder un retour à la ligne.");
    }

    const numArray = numbers
        .split(delimiter)
        .map(num => parseFloat(num))
        .filter(num => !isNaN(num) && num < 1000);

    const negatives = numArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`Negatives not allowed. [${negatives.join(", ")}]`);
    }

    return numArray.reduce((acc, num) => acc + num, 0);
}

// Fonction les caractères spéciaux
function escapeRegExp(string) {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
