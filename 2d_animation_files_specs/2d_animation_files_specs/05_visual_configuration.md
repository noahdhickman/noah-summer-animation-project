# Visual Configuration

This document details the format specifications for the `visualization` section in the main `core_animation_file.json`. This section defines how the simulation model, its components, and entities are displayed during animation playback.

> **Note:** For multi-replication support, the content described in this document is moved to the shared `shared_visual_config.json` file. See [Multi-Replication Structure](./01b_multi_replication_structure.md) for details.

## Overview

The `visualization` section controls the overall look and feel of the animation:

```json
"visualization": {
  "backgroundMode": "svg", // "svg", "image", "color", or "none"
  "svgPath": "diagrams/hospital_layout.svg", // Path to the SVG file if backgroundMode is "svg"
  "imagePath": "backgrounds/floorplan.png", // Path if backgroundMode is "image"
  "backgroundColor": "#EAEAEA", // Used if backgroundMode is "color"
  "canvasSize": { // Optional: preferred canvas dimensions if not derived from SVG/image
    "width": 1600,
    "height": 900
  },
  "spriteAtlas": {
    "url": "sprites/main_sprite_atlas.json", // Path to the sprite atlas definition (e.g., TexturePacker JSON)
    "texture": "sprites/main_sprite_atlas.png" // Path to the corresponding sprite sheet image
  },
  "entityTypes": {
    // Definitions for different types of entities
  },
  "defaultStyles": {
    // Default visual styles for model components if not overridden
  }
}
```

## Background Configuration

Determines what is displayed as the static backdrop for the animation:

- **backgroundMode** (string, required): Defines the type of background:
  - `"svg"`: Use an SVG file as the background. The `svgPath` property must be provided. This is the recommended mode for accurate diagram representation.
  - `"image"`: Use a raster image (PNG, JPG) as the background. The `imagePath` property must be provided.
  - `"color"`: Use a solid color as the background. The `backgroundColor` property should be provided.
  - `"none"`: No background, transparent.
- **svgPath** (string, optional): Relative path to the SVG file, used when `backgroundMode` is `"svg"`.
- **imagePath** (string, optional): Relative path to the image file, used when `backgroundMode` is `"image"`.
- **backgroundColor** (string, optional): Hex color code (e.g., "#FFFFFF"), used when `backgroundMode` is `"color"`.
- **canvasSize** (object, optional): Specifies desired width and height for the animation canvas. If an SVG or image is used, the canvas might adapt to its dimensions.

Example for SVG background:

```json
"visualization": {
  "backgroundMode": "svg",
  "svgPath": "process_flow.svg"
}
```

## Sprite Atlas

Defines the sprite sheet and its associated metadata for rendering animated sprites:

```json
"spriteAtlas": {
  "url": "path/to/your/sprites.json", // e.g., from TexturePacker, LayaAir Atlas, or a custom format
  "texture": "path/to/your/sprites.png" // The actual image file containing all sprites
}
```

- **url** (string, required): Path to the JSON (or XML) file describing the sprite frames within the texture.
- **texture** (string, required): Path to the sprite sheet image.

## Entity Types (entityTypes)

This object defines the visual appearance for different types of entities. The `type` field in the entity path data (from external batch files, see [Entity Paths](./03_entity_paths.md)) maps to a key in this `entityTypes` object:

```json
"entityTypes": {
  "Patient": { // Key is the entity type string used in path data
    "defaultSprite": "patient_male_general", // Sprite name from the atlas for default appearance
    "scale": 0.75,                           // Optional: scaling factor for the sprite
    "anchor": {"x": 0.5, "y": 1.0},          // Optional: anchor point (0-1) for sprite positioning
    "rotation": 0,                           // Optional: default rotation in degrees
    "tint": "#FFFFFF",                       // Optional: default tint color
    "stateSprites": {                        // Optional: map of entity states to specific sprite names
      "waiting": "patient_male_sitting",
      "processing": "patient_male_treatment",
      "traveling": "patient_male_walking_cycle", // Could be an animation key
      "exited": null // `null` can mean the entity becomes invisible
    },
    "attributesDisplay": [ // Optional: defines how certain entity attributes are visualized
      {"attributeName": "priority", "prefix": "P:", "color": "#FF0000"}
    ]
  },
  "MedicalStaff": {
    "defaultSprite": "doctor_female",
    "scale": 0.8,
    "stateSprites": {
      "idle": "doctor_female_idle",
      "busy_with_patient": "doctor_female_attending",
      "walking": "doctor_female_walking"
    }
  }
}
```

Each entity type definition can include:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `defaultSprite` | string | Yes | The default sprite name from the atlas |
| `scale` | number | No | Multiplier for the sprite's size |
| `anchor` | object | No | {x, y} defining the sprite's anchor point (0.0 to 1.0 range) |
| `rotation` | number | No | Default rotation in degrees |
| `tint` | string | No | Hex color for tinting the sprite |
| `stateSprites` | object | No | A map where keys are entity state strings (from path points) and values are sprite names from the atlas |
| `attributesDisplay` | array | No | Configures how to visually represent specific entity attributes |

The `stateSprites` mapping allows entities to change appearance based on their state as they move through the simulation.

## Default Styles (defaultStyles)

Provides default visual styling for model components (Activities, Resources, Generators, Connectors) if they are rendered by the animation engine itself (e.g., as simple shapes when an SVG is not detailed enough or not used for certain elements). These styles can be overridden by `visual_settings` within individual component definitions in the model section:

```json
"defaultStyles": {
  "activity": {
    "shape_type": "rectangle", // "rectangle", "circle", "ellipse"
    "fillColor": "#3498DB",    // Default fill color
    "strokeColor": "#2980B9",  // Default stroke color
    "strokeWidth": 2,
    "labelColor": "#FFFFFF",
    "labelFont": "Arial",
    "labelSize": 12
  },
  "resource": {
    "shape_type": "circle",
    "fillColor": "#2ECC71",
    // ... similar properties
  },
  "generator": {
    "shape_type": "rectangle_rounded",
    "fillColor": "#E74C3C",
    // ... similar properties
  },
  "connector": { // If connectors are drawn by the engine, not solely from SVG
    "strokeColor": "#7F8C8D",
    "strokeWidth": 3,
    "lineStyle": "solid" // "solid", "dashed", "dotted"
  }
}
```

### Common Style Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `shape_type` | string | No | Type of shape to render ("rectangle", "circle", "ellipse", "rectangle_rounded") |
| `fillColor` | string | No | Fill color for the component (hex color) |
| `strokeColor` | string | No | Stroke/outline color (hex color) |
| `strokeWidth` | number | No | Width of the stroke/outline in pixels |
| `labelColor` | string | No | Text color for labels (hex color) |
| `labelFont` | string | No | Font family for labels |
| `labelSize` | number | No | Font size for labels in pixels |

### Component-Specific Style Properties

#### Activity Style Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `inputBufferColor` | string | No | Fill color for input buffer |
| `outputBufferColor` | string | No | Fill color for output buffer |

#### Connector Style Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `lineStyle` | string | No | Line style ("solid", "dashed", "dotted") |
| `arrowSize` | number | No | Size of arrow heads in pixels |

## Animation Settings

Optional animation settings control playback characteristics:

```json
"animation": {
  "speed": 1.0,             // Default playback speed multiplier
  "smoothing": true,        // Enable position interpolation for smoothness
  "entityFadeIn": 0.3,      // Duration of entity fade-in animation in seconds
  "entityFadeOut": 0.3,     // Duration of entity fade-out animation in seconds
  "transitionDuration": 0.5 // Duration of state transitions in seconds
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `speed` | number | No | Default playback speed multiplier (default: 1.0) |
| `smoothing` | boolean | No | Enable position interpolation for smoothness (default: true) |
| `entityFadeIn` | number | No | Duration of entity fade-in animation in seconds |
| `entityFadeOut` | number | No | Duration of entity fade-out animation in seconds |
| `transitionDuration` | number | No | Duration of state transitions in seconds |

## Camera and Viewport

Optional camera settings control the initial view:

```json
"camera": {
  "x": 800,              // Initial camera center X position
  "y": 450,              // Initial camera center Y position
  "zoom": 1.0,           // Initial zoom level
  "bounds": {            // Optional: camera movement boundaries
    "x": 0,
    "y": 0,
    "width": 1600,
    "height": 900
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `x` | number | No | Initial camera x-position (center) |
| `y` | number | No | Initial camera y-position (center) |
| `zoom` | number | No | Initial zoom level (default: 1.0) |
| `bounds` | object | No | Camera movement boundaries |

## Example

Here's a complete example of a visualization section:

```json
"visualization": {
  "backgroundMode": "svg",
  "svgPath": "diagrams/hospital_layout.svg",
  "canvasSize": {
    "width": 1600,
    "height": 900
  },
  "spriteAtlas": {
    "url": "sprites/hospital_sprites.json",
    "texture": "sprites/hospital_sprites.png"
  },
  "entityTypes": {
    "Patient": {
      "defaultSprite": "patient_neutral",
      "scale": 0.8,
      "anchor": {"x": 0.5, "y": 1.0},
      "stateSprites": {
        "waiting": "patient_sitting",
        "processing": "patient_treatment",
        "traveling": "patient_walking_cycle",
        "blocked": "patient_frustrated",
        "exited": null
      },
      "attributesDisplay": [
        {"attributeName": "priority", "prefix": "P:", "color": "#FF0000"}
      ]
    },
    "Nurse": {
      "defaultSprite": "nurse_female",
      "scale": 0.9,
      "stateSprites": {
        "idle": "nurse_standing",
        "busy": "nurse_working",
        "walking": "nurse_walking_cycle"
      }
    },
    "Doctor": {
      "defaultSprite": "doctor_male",
      "scale": 0.9,
      "stateSprites": {
        "idle": "doctor_standing",
        "busy": "doctor_examining",
        "walking": "doctor_walking_cycle"
      }
    }
  },
  "defaultStyles": {
    "activity": {
      "shape_type": "rectangle_rounded",
      "fillColor": "#3498DB",
      "strokeColor": "#2980B9",
      "strokeWidth": 2,
      "labelColor": "#FFFFFF",
      "labelFont": "Arial",
      "labelSize": 12
    },
    "resource": {
      "shape_type": "circle",
      "fillColor": "#2ECC71",
      "strokeColor": "#27AE60",
      "strokeWidth": 2,
      "labelColor": "#FFFFFF"
    },
    "generator": {
      "shape_type": "triangle",
      "fillColor": "#E74C3C",
      "strokeColor": "#C0392B",
      "strokeWidth": 2,
      "labelColor": "#FFFFFF"
    },
    "connector": {
      "strokeColor": "#7F8C8D",
      "strokeWidth": 3,
      "lineStyle": "solid",
      "arrowSize": 10
    }
  },
  "animation": {
    "speed": 1.0,
    "smoothing": true,
    "entityFadeIn": 0.3,
    "entityFadeOut": 0.5,
    "transitionDuration": 0.2
  },
  "camera": {
    "x": 800,
    "y": 450,
    "zoom": 1.0,
    "bounds": {
      "x": 0,
      "y": 0,
      "width": 1600,
      "height": 900
    }
  }
}
```

This comprehensive visual configuration provides a rich and customizable animation experience that can be adapted to different simulation scenarios.
