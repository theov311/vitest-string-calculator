import { expect, test } from 'vitest'
import { add } from '../js/main.js'

test("Retourne 0 pour une chaîne vide", () => {
    expect(add("")).toBe(0);
});

test("Additionne des nombres séparés par des virgules", () => {
    expect(add("1,2,3")).toBe(6);
});

test("Additionne des nombres séparés par des retours à la ligne", () => {
    expect(add("1\n2\n3")).toBe(6);
});

test("Additionne un mélange de virgules et de retours à la ligne", () => {
    expect(add("1\n2,3")).toBe(6);
});

test("Utilise un séparateur personnalisé ';'", () => {
    expect(add("//;\n1;2;3")).toBe(6);
});

test("Utilise un séparateur personnalisé '|'", () => {
    expect(add("//|\n4|5|6")).toBe(15);
});

test("Génère une erreur si une virgule est suivie d'un retour à la ligne", () => {
    expect(() => add("1,\n")).toThrow("Format incorrect : une virgule ne peut pas précéder un retour à la ligne.");
});

test("Lève une exception pour un nombre négatif", () => {
    expect(() => add("1,-2,3")).toThrow("Negatives not allowed. [-2]");
});

test("Lève une exception et liste tous les nombres négatifs", () => {
    expect(() => add("1,-2,-5,3")).toThrow("Negatives not allowed. [-2, -5]");
});

test('Les nombres strictement plus grand que 1000 doivent être ignorés.', () => {
    expect(add("1\n2,1002")).toBe(3)
  })

test('Les séparateurs peuvent être définis par plusieurs caractères', () => {
  expect(add("//[***]\n1***2***3")).toBe(6)
})

test('Plusieurs séparateurs', () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6)
  })


test('Dernier cas TDD', () => {
    expect(add("//[**][%%]\n1**2%%3")).toBe(6)
  })