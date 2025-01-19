from manim import *


class OGImage(Scene):
    def construct(self):
        # Create main title with custom styling
        title = Text(
            "Save Twitter Videos",
            font="Times New Roman",
            weight=BOLD,
            color=BLACK
        ).scale(1.5)

        # Create subtitle with italic style
        subtitle = Text(
            "With Grace",
            font="Times New Roman",
            slant=ITALIC,
            color="#8B4513"
        ).scale(1.2)

        # Position titles
        title.to_edge(UP)
        subtitle.next_to(title, DOWN)

        # Create feature texts
        features = VGroup(
            Text("⚡ SWIFT & SEAMLESS", font_size=24, color=BLACK),
            Text("🖥 ORIGINAL QUALITY", font_size=24, color=BLACK),
            Text("🔒 PRIVACY ASSURED", font_size=24, color=BLACK),
        ).arrange(RIGHT, buff=1)
        features.next_to(subtitle, DOWN * 2)

        # Create description text
        description = Text(
            "Save any Twitter/X video in original quality",
            font_size=28,
            color=BLACK
        )
        subtext = Text(
            "No fuss, no sign-ups, just elegant simplicity.",
            font_size=24,
            color="#666666"
        )

        # Position description texts
        description.next_to(features, DOWN * 2)
        subtext.next_to(description, DOWN)

        # Create input box with rounded corners
        input_box = RoundedRectangle(
            corner_radius=0.1,
            height=0.5,
            width=5,
            color="#EEEEEE",
            fill_color=WHITE,
            fill_opacity=1,
            stroke_width=1
        )

        # Add placeholder text
        placeholder = Text(
            "Paste Twitter/X video URL here",
            font_size=24,
            color="#999999"
        )
        placeholder.move_to(input_box)

        # Create download button
        button_box = RoundedRectangle(
            corner_radius=0.1,
            height=0.5,
            width=5,
            fill_color="#FFD699",
            fill_opacity=1,
            stroke_width=0
        )
        button_text = Text(
            "↓ Download Video",
            font_size=24,
            color=BLACK
        )
        button_text.move_to(button_box)

        # Position input and button
        input_group = VGroup(input_box, placeholder)
        button_group = VGroup(button_box, button_text)

        input_group.next_to(subtext, DOWN * 3)
        button_group.next_to(input_group, DOWN * 1)

        # Update shadow effect
        shadow = RoundedRectangle(
            corner_radius=0.1,
            height=1.8,
            width=8,
            fill_color=BLACK,
            fill_opacity=0.05,
            stroke_width=0
        )
        shadow.move_to(VGroup(input_group, button_group))
        shadow.shift(RIGHT * 0.1)

        # Create Twitter/X icon using SVG file with matching brown color
        twitter_icon = SVGMobject(
            "public/assets/twitter.svg",
            stroke_width=0,
            fill_color="#8B4513",  # Match subtitle's saddle brown color
            fill_opacity=1
        ).scale(0.3)

        # Position the Twitter icon at the bottom
        twitter_icon.next_to(button_group, DOWN * 2)

        # Add all elements to scene
        self.add(title, subtitle, features, description,
                 subtext, shadow, input_group, button_group, twitter_icon)

        # Set background color (light beige)
        self.camera.background_color = "#FDF6F0"
