# Code Snippets Reference

Here are the code snippets you provided for reference.

---

### JavaScript: `renderMarkdown` (Basic)

```javascript
function renderMarkdown(markdown) {
        if (!markdown) return '';

        // This is a very basic markdown renderer for fallback purposes
        let html = markdown;

        // Convert headers
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$2</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$3</h3>');
        html = html.replace(/^#### (.*$)/gm, '<h4>$4</h4>');
        html = html.replace(/^##### (.*$)/gm, '<h5>$5</h5>');

        // Convert code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Convert inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\\\[(.*?)\\\]\((.*?)\\\)/g, '<a href="$2">$1</a>');

        // Convert paragraphs - this is simplistic
        html = html.replace(/\n\s*\n/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Fix potentially broken paragraph tags
        html = html.replace(/<\/p><p><\/p><p>/g, '</p><p>');
        html = html.replace(/<\/p><p><(h[1-5])/g, '</p><$1');
        html = html.replace(/<\/(h[1-5])><p>/g, '</$1>');

        return html;
    }
```

---

### JavaScript: `renderMarkdown` (Advanced with Marked.js)

```javascript
function renderMarkdown(markdown) {
    if (!markdown) {
        return '<div class="alert alert-warning">No content available</div>';
    }

    try {
        // Use marked library if available
        if (typeof marked !== 'undefined') {
            // Configure marked options
            marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                smartLists: true,
                smartypants: true,
                highlight: function(code, language) {
                    // Use Prism for syntax highlighting if available
                    if (typeof Prism !== 'undefined' && Prism.languages[language]) {
                        return Prism.highlight(code, Prism.languages[language], language);
                    }
                    return code;
                }
            });

            // Parse markdown and return HTML
            const html = marked.parse(markdown);

            // Process any special elements like image references
            const processedHtml = processSpecialMarkdown(html);

            return `<div class="markdown-content">${processedHtml}</div>`;
        } else {
            // Basic fallback if marked is not available
            console.warn('Marked library not available. Using basic formatting.');
            const basic = markdown
                .replace(/\n\n/g, '<br><br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\\\[(.*?)\\\]\((.*?)\\\)/g, '<a href="$2" target="_blank">$1</a>');

            return `<div class="markdown-content">${basic}</div>`;
        }
    } catch (error) {
        console.error('Error rendering markdown:', error);
        return `<div class="alert alert-danger">Error rendering content: ${error.message}</div>`;
    }
}
```

---

### Python: `load_markdown_file`

```python
def load_markdown_file(filename: str) -> str:
    """Load a markdown file from the static/react directory.

    Args:
        filename (str): The name of the markdown file to load (e.g. 'basic-ui-setup.md')

    Returns:
        str: The content of the markdown file, or empty string if file not found
    """
    base_dir = Path(__file__).parent.parent
    react_dir = base_dir / 'static' / 'react'
    file_path = react_dir / filename

    if file_path.exists():
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        print(f'Warning: File not found: {file_path}')
        return ''
```

---

### Python: `parse_markdown_documentation` (Snippet 1)

```python
def parse_markdown_documentation(
    content: str,
    asset_name: str,
    url: str,
    correlation_id: str = '',
) -> Dict[str, Any]:
    """Parse markdown documentation content for a resource.

    Args:
        content: The markdown content
        asset_name: The asset name
        url: The source URL for this documentation
        correlation_id: Identifier for tracking this request in logs

    Returns:
        Dictionary with parsed documentation details
    """
    # ... (Implementation details) ...
```

---

### Python: `parse_markdown_documentation` (Snippet 2)

```python
def parse_markdown_documentation(
    content: str, asset_name: str, url: str, correlation_id: str = ''
) -> Dict[str, Any]:
    """Parse markdown documentation content for a resource.

    Args:
        content: The markdown content
        asset_name: The asset name
        url: The source URL for this documentation
        correlation_id: Identifier for tracking this request in logs

    Returns:
        Dictionary with parsed documentation details
    """
    # ... (Implementation details) ...
```

---

### Python: Test Class `TestFormatMarkdown`

```python
class TestFormatMarkdown:
    """Tests for the Markdown formatting functions."""

    def test_format_markdown_case_summary(self, support_case_data):
        # ... (Implementation details) ...

    def test_format_markdown_services(self, services_response_data):
        # ... (Implementation details) ...

    def test_format_markdown_severity_levels(self, severity_levels_response_data):
        # ... (Implementation details) ...

    def test_format_json_response(self):
        # ... (Implementation details) ...
```

---

### Python: `MarkdownProcessor` Class

```python
class MarkdownProcessor(BaseFileProcessor):
    SUPPORTED_TYPES = {FileType.MARKDOWN}

    @classmethod
    def _process_file(cls, file_path: Path, doc: Document) -> Document:
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                text = file.read()

                doc.raw_content = text
                doc.extract_status = ProcessStatus.SUCCESS

        except Exception as e:
            doc.extract_status = ProcessStatus.FAILED
            raise FileProcessingError(f"Failed to process markdown file: {str(e)}")

        return doc
```

---

### Python: `get_markdown` Function

```python
def get_markdown(research_id):
    """Get markdown export for a specific research"""
    # ... (Implementation details) ...
```

---

### Python: `convert_to_markdown`

```python
def convert_to_markdown(text):
    """Convert extracted text to markdown format."""
    # ... (Implementation details) ...
```

---

### TypeScript: `MarkdownRendererProps` Interface

```typescript
interface MarkdownRendererProps {
  content: string;
  fileExtension?: string;
  truncate?: boolean;
  maxLength?: number;
  indented?: boolean;
}
```

---

### JavaScript: `loadScripts`

```javascript
function loadScripts(folder, scripts) {
        if (!scripts || !scripts.length) return;

        scripts.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = `/research/static/js/${folder}/${script}`;
            scriptElement.async = false; // Load in sequence
            document.body.appendChild(scriptElement);
        });
    }
```

---

### JSX: Script Tag

```jsx
<script
      key="myscript"
      dangerouslySetInnerHTML={{ __html: codeToRunOnClient }}
/>
```

---

### JavaScript: Arrow Function for Script Element

```javascript
script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = `/research/static/js/${folder}/${script}`;
            scriptElement.async = false; // Load in sequence
            document.body.appendChild(scriptElement);
        }
```

---

### Python: `generate_script_content`

```python
def generate_script_content(
    runtime: str, entry_point: str, additional_env: Optional[Dict[str, str]] = None
) -> str:
    """Generate script content based on runtime and entry point."""
    # ... (Implementation details) ...
```

---

### C++: `Fish` Class (Snippet 1)

```cpp
class Fish
{
public:
	int id;
	fish_type type;
	int hp;
	int atk;
	int skill_used = 0;
	active_skill active;
	passive_skill passive;
	Fish() {}
	Fish(int _id, int _hp, int _atk) : id(_id), hp(_hp), atk(_atk) {}
	Fish &operator=(const Fish &_fish)
	{
		id = _fish.id;
		hp = _fish.hp;
		atk = _fish.atk;
		return *this;
	}
}
```

---

### C++: `get_fight_fishs` Function

```cpp
std::vector<Fish*> get_fight_fishs() const;
```

---

### C++: `Player::get_fight_fishs` Implementation

```cpp
std::vector<Fish*> Player::get_fight_fishs() const{
    return fight_fish.get_fishs();
}
```

---

### C++: `Fish` Class (Snippet 2, more detailed)

```cpp
class Fish {
  public:
    // ... (Enums, members, methods) ...
}
```

---

### C++: `fen` Function

```cpp
std::string fen() const;
```

---

### C++: `FishSet` Class

```cpp
class FishSet
{
private:
  std::vector<Fish *> fishs;

  public:
    // ... (Members and methods) ...
}
```