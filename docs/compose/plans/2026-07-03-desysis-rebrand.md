# Desysis Rebranding Implementation Plan

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/desysis-rebrand.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the portfolio website from "Forward Key Solutions" to "Desysis" and update the visual theme to a Cyberpunk Neon style that matches the brand identity.

**Architecture:** Update text references across HTML/CSS/JS and apply a cyberpunk neon color palette with glowing effects, geometric shapes, and tech-forward aesthetics.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JavaScript

---

### Task 1: Update HTML Text References

**Covers:** Brand name, title, email, LinkedIn, footer

**Files:**
- Modify: `index.html` (all references to "Forward Key Solutions" and "FKS")

- [ ] **Step 1: Update page title**

Change from:
```html
<title>Forward Key Solutions</title>
```

To:
```html
<title>Desysis</title>
```

- [ ] **Step 2: Update hero section brand name**

Replace the `brand-title` content:
```html
<h1 class="brand-title">
    <span class="brand-line">Luca</span>
    <span class="brand-line expand-container">
        <span class="word-block">
            <span class="letter-init highlight-purple">D</span>
            <span class="letter-rest">esisys</span>
        </span>
    </span>
</h1>
```

- [ ] **Step 3: Update "Quem Somos" section card title**

Change from:
```html
<h3>A Agência FKS</h3>
```

To:
```html
<h3>A Agência Desysis</h3>
```

- [ ] **Step 4: Update contact email**

Change from:
```html
<a href="mailto:contato@forwardkeysolutions.com" class="contact-link">
```

To:
```html
<a href="mailto:contato@desysis.com" class="contact-link">
```

- [ ] **Step 5: Update LinkedIn link**

Change from:
```html
<a href="https://linkedin.com/company/forwardkeysolutions" target="_blank" class="contact-link">
```

To:
```html
<a href="https://linkedin.com/company/desysis" target="_blank" class="contact-link">
```

- [ ] **Step 6: Update footer text**

Change from:
```html
<p>&copy; 2026 Forward Key Solutions | IMPRESSIONART INSPIRATION. Todos os direitos reservados. FKS LTDA.</p>
```

To:
```html
<p>&copy; 2026 Desysis. Todos os direitos reservados.</p>
```

- [ ] **Step 7: Commit changes**

```bash
git add index.html
git commit -m "feat: rebrand Forward Key Solutions to Desysis"
```

---

### Task 2: Update CSS Color Palette

**Covers:** Cyberpunk Neon theme for Desysis

**Files:**
- Modify: `style.css` (root variables and neon colors)

- [ ] **Step 1: Update root variables for Desysis theme**

Replace the `:root` section:
```css
:root {
    --bg-main: #0a0a0f;
    --bg-panel: rgba(15, 15, 25, 0.6);
    --neon-cyan: #00f0ff;
    --neon-magenta: #ff00d4;
    --neon-purple: #8b5cf6;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --border-neon: 2px solid var(--neon-cyan);
    --glow-cyan: 0 0 20px rgba(0, 240, 255, 0.4);
    --glow-magenta: 0 0 20px rgba(255, 0, 212, 0.4);
}
```

- [ ] **Step 2: Update brand title highlight colors**

Change the `.highlight-purple` and `.highlight-blue` classes:
```css
.highlight-purple {
    color: var(--neon-magenta);
    text-shadow: 0 0 30px rgba(255, 0, 212, 0.6);
}

.highlight-blue {
    color: var(--neon-cyan);
    text-shadow: 0 0 30px rgba(0, 240, 255, 0.6);
}
```

- [ ] **Step 3: Update CTA button hover effect**

Update `.cta-button:hover`:
```css
.cta-button:hover {
    background: var(--neon-cyan);
    color: var(--bg-main);
    box-shadow: var(--glow-cyan), 0 0 40px rgba(0, 240, 255, 0.3);
    transform: translateY(-2px);
}
```

- [ ] **Step 4: Update nav link hover**

Update `.nav-links a:hover`:
```css
.nav-links a:hover {
    color: #fff;
    border-left-color: var(--neon-cyan);
    background: rgba(0, 240, 255, 0.08);
    transform: translateX(10px);
    box-shadow: var(--glow-cyan);
}
```

- [ ] **Step 5: Update card hover effects**

Update `.skill-card:hover`:
```css
.skill-card:hover {
    border-color: var(--neon-magenta);
    transform: scale(1.02) translateY(0px);
    background: rgba(15, 15, 25, 0.8);
    box-shadow: var(--glow-magenta), -10px 10px 0px var(--neon-magenta);
}
```

- [ ] **Step 6: Update contact link hover**

Update `.contact-link:hover`:
```css
.contact-link:hover {
    background: var(--neon-magenta);
    border-color: #fff;
    transform: translateY(-5px);
    box-shadow: var(--glow-magenta), 5px 5px 0px var(--neon-cyan);
}
```

- [ ] **Step 7: Commit changes**

```bash
git add style.css
git commit -m "feat: apply Desysis cyberpunk neon color theme"
```

---

### Task 3: Update JavaScript Brand Title Handling

**Covers:** Dynamic brand title expansion on mobile

**Files:**
- Modify: `script.js` (brand title expansion logic)

- [ ] **Step 1: Verify script still works with new brand name**

The script targets `.brand-title` which remains unchanged, so no code changes needed. Just verify the mobile expansion works.

- [ ] **Step 2: Test in browser**

Open the site and verify:
- Desktop: Brand shows "Luca D" with hover expanding to "Luca Desysis"
- Mobile: Scroll triggers expansion to "Luca Desysis"
- All neon effects are visible
- Navigation works correctly

- [ ] **Step 3: Commit verification**

```bash
git commit --allow-empty -m "test: verify Desysis brand title works on mobile"
```
