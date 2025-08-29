## DOM Selection & Events

## 1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?

- **document.getElementById(id)**
  - Returns a single **Element** (or **null** if not found).
  - Looks up by the element's **id** only.
  - Fast and commonly used when we know the exact unique id.

- **document.getElementsByClassName(classNames)**
  - Returns a live **HTMLCollection** of elements that have the given class(es).
  - The argument can be one or more class names separated by spaces.
  - The collection is live — if the DOM changes, the collection updates automatically.
  - Not an **Array** (but array-like). We can use **Array.from(...)** to convert it.
  
- **document.querySelector(selector)** and **document.querySelectorAll(selector)**
  - Accept any valid CSS selector.
  - **querySelector** returns the **first** matching **Element** (or **null**).
  - **querySelectorAll** returns a static **NodeList** of matches (does not auto-update when DOM changes).
  - **NodeList** supports **forEach** in modern browsers; convert to array if we need array methods.

---

## 2. How do you `create and insert a new element into the DOM`?

- **Steps:**

  1. Create the element: **document.createElement(tagName)**.
  2. Configure it: set **className**, **id**, attributes, **textContent** or children.
  3. Insert it into the document using **appendChild**

---

## 3. What is `Event Bubbling` and how does it work?

**Event bubbling** is the process where an event that occurs on a DOM element first runs handlers on the target element and then **bubbles up** the DOM tree, triggering the same event type on ancestor elements, one level at a time, up to the **document** and **window**.

**Event phases**:

  1. Capturing phase — event travels top-down to the target (rarely used by default).

  2. Target phase — event reaches the target element.

  3. Bubbling phase — event travels bottom-up from target to ancestors.

By default most event listeners we add with **addEventListener('click', fn)** listen during the bubbling phase (unless we pass **{ capture: true }**). Bubbling lets parent elements react to child events without adding listeners to every child.

**Example**: clicking a button inside a **div** triggers:

  - **button**'s click handler, then

  - **div**'s click handler, then

  - the **body** and **document** handlers.

---

## 4. What is `Event Delegation` in JavaScript? Why is it useful?

**Event delegation** means attaching a single event listener to a common ancestor (often the container element) and using properties like **event.target**, **event.currentTarget**, or **Element.matches()** / **closest()** to react only when specific child elements were the actual target.

**Why it’s useful**:

  - **Works with dynamic elements** — we don’t need to add listeners to elements created later.

  - **Performance** — fewer listeners means less memory and faster setup.

  - **Cleaner code** — centralizes handlers in one place

---

## 5. What is the difference between `preventDefault()` and `stopPropagation()` methods?

- **event.preventDefault()**

  - Cancels the browser’s default action for that event on the target element.

  - **Examples**: prevents a link from navigating, prevents a form from submitting, prevents checkbox toggle in some cases,   or stops a context menu (**contextmenu** event) from opening.

  - It does **not** stop the event from bubbling to ancestor elements.

- **event.stopPropagation()**

  - Stops the event from moving further along the propagation path (prevents further bubbling to ancestors and also prevents further capturing handlers if in that phase).

  - It does **not** cancel the browser’s default action.

