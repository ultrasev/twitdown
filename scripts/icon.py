from manim import *


class TwitterDownloadIcon(Scene):
    def construct(self):
        # Set background color to pure black
        self.camera.background_color = WHITE

        # Create the egg using an ellipse - make it golden!
        egg = Ellipse(
            width=1.6,
            height=2.2,
            color=GOLD,  # Changed to golden color
            fill_opacity=0.4,  # Increased opacity for richer look
            stroke_width=2
        )

        # Enhanced 3D effect with golden gradient
        egg_highlight = Ellipse(
            width=1.4,
            height=2.0,
            color=WHITE,
            fill_opacity=0.15,  # Adjusted opacity
            stroke_width=0
        ).shift(UP * 0.1 + LEFT * 0.1)

        # Add extra golden glow
        egg_glow = Ellipse(
            width=1.8,
            height=2.4,
            color=GOLD,
            fill_opacity=0.1,
            stroke_width=0
        )

        # Group egg elements with new glow effect
        egg_group = VGroup(egg_glow, egg, egg_highlight)
        egg_group.rotate(-PI/6)  # 整体再旋转60度
        egg_group.scale(0.8)

        # Create final composition
        final_icon = VGroup(egg_group)
        final_icon.scale(7)  # Adjust overall size

        # Add to scene
        self.add(final_icon)
