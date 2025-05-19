# Sprite Atlas Specifications

This document describes the sprite atlas format used in the Quodsi 2D Animation System. It explains how sprite sheets and their definition files are structured and referenced within the animation system.

## Overview

A sprite atlas (or sprite sheet) is a technique used in game development and animation where multiple smaller images (sprites) are combined into a single larger image to improve performance and efficiency. The Quodsi 2D Animation System uses sprite atlases to render entity graphics and visual states.

The system requires two key files for each sprite atlas:
1. A PNG image file containing all individual sprites
2. A JSON definition file mapping each named sprite to its position in the image

## TexturePacker JSON Format

The Quodsi animation system uses the TexturePacker JSON format, which is an industry standard for defining sprite atlases. TexturePacker is a popular tool that optimizes and packs multiple images into a single sprite sheet.

### Basic Structure

A typical TexturePacker JSON file has this structure:

```json
{
  "frames": {
    "sprite_name_1": {
      "frame": {"x": 0, "y": 0, "w": 32, "h": 32},
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {"x": 0, "y": 0, "w": 32, "h": 32},
      "sourceSize": {"w": 32, "h": 32}
    },
    "sprite_name_2": {
      "frame": {"x": 32, "y": 0, "w": 32, "h": 32},
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {"x": 0, "y": 0, "w": 32, "h": 32},
      "sourceSize": {"w": 32, "h": 32}
    }
    // More sprites...
  },
  "meta": {
    "app": "TexturePacker",
    "version": "1.0",
    "image": "atlas_name.png",
    "format": "RGBA8888",
    "size": {"w": 512, "h": 512},
    "scale": "1"
  }
}
```

### Key Properties

#### Frame Definitions

Each sprite in the `frames` object has the following properties:

* `frame`: Defines the position and size of the sprite in the texture atlas
  * `x`, `y`: Pixel coordinates of the top-left corner of the sprite
  * `w`, `h`: Width and height of the sprite in pixels

* `rotated`: Boolean indicating if the sprite is rotated in the atlas (for optimal packing)

* `trimmed`: Boolean indicating if transparent areas have been trimmed from the sprite
  
* `spriteSourceSize`: If trimmed, specifies the offset and dimensions of the original sprite
  * `x`, `y`: Offset from the original sprite's top-left corner
  * `w`, `h`: Dimensions of the non-trimmed part of the sprite

* `sourceSize`: Original dimensions of the sprite before trimming
  * `w`, `h`: Width and height of the original sprite

#### Metadata

The `meta` object contains information about the sprite sheet as a whole:

* `app`: The application used to generate the sprite sheet (typically "TexturePacker")
* `version`: Version of the format
* `image`: Filename of the corresponding PNG file
* `format`: Pixel format (e.g., "RGBA8888" for 32-bit RGBA)
* `size`: Dimensions of the entire sprite sheet
  * `w`, `h`: Width and height of the sprite sheet in pixels
* `scale`: Scale factor applied to the sprites (usually "1")

## Example: Hospital Sprites

In the Quodsi animation system's mock files, we have a sprite atlas for hospital entities:

```json
{
  "frames": {
    "patient_a_default": {
      "frame": {"x": 0, "y": 0, "w": 32, "h": 32},
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {"x": 0, "y": 0, "w": 32, "h": 32},
      "sourceSize": {"w": 32, "h": 32}
    },
    "patient_a_waiting": {
      "frame": {"x": 64, "y": 0, "w": 32, "h": 32},
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {"x": 0, "y": 0, "w": 32, "h": 32},
      "sourceSize": {"w": 32, "h": 32}
    },
    // Additional patient_a states...
    
    "patient_b_default": {
      "frame": {"x": 0, "y": 32, "w": 32, "h": 32},
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {"x": 0, "y": 0, "w": 32, "h": 32},
      "sourceSize": {"w": 32, "h": 32}
    }
    // Additional patient_b states...
  },
  "meta": {
    "app": "TexturePacker",
    "version": "1.0",
    "image": "hospital_sprites.png",
    "format": "RGBA8888",
    "size": {"w": 224, "h": 64},
    "scale": "1"
  }
}
```

This example defines sprites for two entity types (Patient_Type_A and Patient_Type_B), each with multiple state sprites (default, arrived, waiting, processing, traveling, blocked, exited).

## Visual Layout

The sprites in this example are arranged in a grid:

```
+------------------+------------------+------------------+------------------+------------------+------------------+------------------+
| patient_a_default| patient_a_arrived| patient_a_waiting|patient_a_process.|patient_a_travel. |patient_a_blocked |patient_a_exited  |
| (0,0,32,32)      | (32,0,32,32)     | (64,0,32,32)     | (96,0,32,32)     | (128,0,32,32)    | (160,0,32,32)    | (192,0,32,32)    |
+------------------+------------------+------------------+------------------+------------------+------------------+------------------+
| patient_b_default| patient_b_arrived| patient_b_waiting|patient_b_process.|patient_b_travel. |patient_b_blocked |patient_b_exited  |
| (0,32,32,32)     | (32,32,32,32)    | (64,32,32,32)    | (96,32,32,32)    | (128,32,32,32)   | (160,32,32,32)   | (192,32,32,32)   |
+------------------+------------------+------------------+------------------+------------------+------------------+------------------+
```

## Integration with Animation System

### Reference in Visual Configuration

The sprite atlas is referenced in the `shared_visual_config.json` file:

```json
{
  "visualization": {
    "spriteAtlas": {
      "url": "sprites/hospital_sprites.json",
      "texture": "sprites/hospital_sprites.png"
    },
    "entityTypes": {
      "Patient_Type_A": {
        "defaultSprite": "patient_a_default",
        "stateSprites": {
          "arrived": "patient_a_arrived",
          "waiting": "patient_a_waiting",
          "processing": "patient_a_processing",
          "traveling": "patient_a_traveling",
          "blocked": "patient_a_blocked",
          "exited": "patient_a_exited"
        }
      }
      // Other entity types...
    }
  }
}
```

### Sprite Selection Logic

The animation engine selects sprites based on:

1. Entity type (e.g., "Patient_Type_A")
2. Current entity state (e.g., "waiting")

When rendering an entity, the engine:
1. Determines the entity type from the entity's path data
2. Checks the current state of the entity
3. Looks up the appropriate sprite name in the `entityTypes` section
4. Retrieves the sprite's position from the sprite atlas definition
5. Renders the corresponding portion of the sprite sheet at the entity's coordinates

## Best Practices

1. **Consistent Dimensions**: Keep sprites for the same entity type the same size to avoid visual glitches during state transitions.

2. **Power of Two**: For optimal GPU performance, sprite sheet dimensions (width and height) should ideally be powers of two (e.g., 256, 512, 1024).

3. **Organization**: Organize sprites logically in the sprite sheet (e.g., group by entity type and state).

4. **Trimming**: Enable trimming when generating sprite sheets to save space by removing transparent pixels.

5. **Optimization**: Use texture compression formats (if supported by the target platform) to reduce memory usage.

## Creating Sprite Atlases

The recommended workflow for creating sprite atlases is:

1. Create individual sprite images for each entity type and state
2. Use TexturePacker or similar tools to pack them into a sprite sheet
3. Export both the PNG and JSON files
4. Reference these files in the animation system's visual configuration

## Animation Engine Implementation

When implementing sprite rendering in an animation engine:

1. Load both the sprite sheet image and its JSON definition at startup
2. Parse the JSON to create a lookup table of sprite names to frame rectangles
3. During rendering, select the appropriate sprite based on entity type and state
4. Use the frame rectangle to draw the correct portion of the loaded sprite sheet image

This approach is efficient because:
- Only one texture needs to be loaded/bound
- Texture switching is minimized
- GPU memory usage is optimized
- Draw calls are reduced

## Conclusion

Sprite atlases are a crucial component of the Quodsim 2D Animation System that enable efficient rendering of entities with different visual states. By following the TexturePacker JSON format and organizing sprites logically, the system achieves both performance and visual fidelity in animations of simulation models.
