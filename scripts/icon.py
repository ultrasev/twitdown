from manim import *


class TwitterDownloadIcon(Scene):
    def construct(self):
        # Set background color to pure black
        self.camera.background_color = None

        twitter_icon = SVGMobject(
            "public/assets/twitter.svg",
            stroke_width=0,
        ).scale(5)
        # Add to scene
        self.add(twitter_icon)
