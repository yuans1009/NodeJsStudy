## EJS Template Syntax Comparison

### Difference in Syntax

1. **First button uses:** `<%= ... %>`
    - The equals sign (`=`) means **OUTPUT/PRINT**
    - Evaluates the expression and displays the result in the HTML
    - Used when you want the value to appear in the rendered output
    - **Result:** Button text will be either "Update Product" or "Add Product"

2. **Second button uses:** `<% ... %>`
    - Without equals sign means **EXECUTE/CONTROL FLOW**
    - Executes JavaScript code but does **NOT** output anything
    - That's why the string "Update Product" and "Add Product" are separate from the tags
    - The actual text content must be written outside the tags
    - **Result:** Same visual output, but the logic flow is more explicit

### Why the Difference?
- Use `<%= %>` when you want to embed and display a value directly
- Use `<% %>` when you want to execute logic (conditionals, loops) without outputting the tags themselves

### Best Practice
The first syntax with `<%= %>` is cleaner and more concise for this use case, as it evaluates and outputs the ternary expression in one statement.

#### Example:

```ejs
<button class="btn" type="submit"><%= editing ? 'Update Product' : 'Add Product' %></button>
<button class="btn" type="submit"><% if (editing) { %>Update Product<% } else { %>Add Product<% } %></button>
```