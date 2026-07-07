# Project: Personal Portfolio Website

## Overview

This is a personal portfolio website for a product designer.

The website should present my design projects in an exploratory and interactive way rather than a traditional portfolio layout.

The main concept is based on the idea of an envelope containing my design works:
- The envelope represents an invitation or a collection of memories/projects.
- Opening the envelope reveals different projects.
- Each project is represented as a physical object (currently pebble-like shapes, but may later become postcard-like objects related to the envelope theme).
- Users can explore projects through interaction before entering the detailed portfolio content.

The overall experience should feel:
- Playful and interactive
- Personal and story-driven
- Light, minimal, and experimental
- Similar to exploring a collection of physical objects

---

# Design Source

Figma:
https://www.figma.com/design/zmR69eT8NL7ldfO2i2I1qc/Webfolio-Dev?node-id=0-462&t=iYNqdaP8oo38h8IT-4

Relevant frames:
- Landing / interactive envelope view
- Expanded portfolio view

---

# Main Interaction Flow

## Initial Landing State

When users first enter the website:

- The screen shows a closed envelope in the center.
- The background is minimal with a soft green glow/gradient atmosphere.
- The envelope is the main interactive element.

Interaction:
- Clicking the envelope triggers an opening animation.
- After opening, multiple project objects/images appear around the envelope.
- The objects should animate outward from the envelope, creating the feeling that projects are being released from inside it.

---

# Project Objects

## Concept

Each object represents one portfolio project.

Current design:
- Objects are pebble-shaped image containers.

Future direction:
- Redesign these objects into shapes more related to the envelope concept, such as postcards, letters, or paper objects.

Each object contains:
- Project cover image
- Project identity

---

## Hover Interaction

When hovering over a project object:

- The object expands.
- Additional project information appears.
- The expanded state should resemble the project preview card shown in Figma.

The expanded information includes:
- Project title
- Short project description
- Project category/type
- Additional metadata if available

The transition should feel smooth and physical, like unfolding or revealing a postcard.

---

## Click Interaction

When clicking a project object:

- Navigate to the corresponding project detail page.

Each project page will contain:
- Project overview
- Design challenge
- Research process
- Design development
- Final outcome

---

# Expand Portfolio View

Below the envelope interaction area there is an arrow.

Interaction:
- Clicking the arrow expands the webpage vertically.
- The page transitions from the interactive envelope experience into a traditional portfolio/resume layout.

Expanded content includes:

## About Me

A personal introduction section.

Content:
- Short biography
- Design philosophy
- Current education/background

---

## Education

Display:
- Degree information
- Institution
- Timeline
- Relevant courses or achievements

---

## Work Experience

Display:
- Company/organization
- Role
- Timeline
- Responsibilities and achievements

---

## Projects Section

A list/grid of portfolio projects.

Each project contains:
- Project image
- Project title
- Short introduction
- Project type/category
- Link to detailed project page

The layout should follow the Figma design:
- Alternating image/text alignment
- Minimal typography
- Large whitespace
- Editorial feeling

---

# Visual Style

The website should maintain the visual language from Figma:

Keywords:
- Minimal
- Soft
- Organic
- Editorial
- Personal
- Experimental

Visual characteristics:
- Large amount of whitespace
- Soft green ambient glow
- Thin line illustrations
- Rounded organic shapes
- Light typography
- Subtle animations

Avoid:
- Heavy UI elements
- Standard dashboard/card layouts
- Excessive shadows
- Generic portfolio templates

---

# Technical Requirements

Tech stack:
- React
- TypeScript
- Tailwind CSS

Requirements:
- Responsive design
- Smooth animations
- Reusable components
- Clean component structure

Suggested components:
App
├── EnvelopeLanding
│ ├── Envelope
│ ├── ProjectObjects
│ └── ProjectPreview
│
├── ExpandButton
│
├── AboutSection
├── EducationSection
├── ExperienceSection
│
├── ProjectsSection
│ └── ProjectCard
│
└── ProjectDetailPage


---

# Development Process

Before coding:

1. Analyze the Figma file.
2. Identify:
   - Design tokens
   - Typography
   - Colors
   - Assets
   - Animation requirements
3. Propose a component structure.
4. Explain any assumptions.

Then implement the website.

Prioritize:
1. Interaction experience
2. Visual similarity with Figma
3. Responsive behavior
4. Code maintainability