export const uischema = {
  type: "Categorization",
  elements: [
    {
      type: "Category",
      label: "Color",
      elements: [
        {
          type: "VerticalLayout",
          elements: [
            ...[
              "primary",
              "bg",
              "fg",
              "link",
              "positive",
              "negative",
              "notice",
              "informative",
            ].map((name) => ({
              type: "HorizontalLayout",
              elements: [
                {
                  type: "Control",
                  scope: `#/properties/color/properties/${name}/properties/$root`,
                  label: name,
                },
                {
                  type: "Control",
                  label: name + " inverted",
                  scope: `#/properties/color/properties/${name}/properties/inverted`,
                },
              ],
            })),
            {
              type: "Group",
              label: "Scale",
              elements: [0, 3, 6].map((row) => ({
                type: "HorizontalLayout",
                elements: [1, 2, 3].map((col) => ({
                  type: "Control",
                  scope: `#/properties/color/properties/scale/properties/${
                    row + col
                  }`,
                })),
              })),
            },
          ],
        },
      ],
    },
    {
      type: "Category",
      label: "Typo",
      elements: [
        {
          type: "Categorization",
          elements: [
            ...["display", "copy", "interface", "mono"].map((name) => ({
              type: "Category",
              label: name,
              elements: [
                {
                  type: "Control",
                  label: "Font Family",
                  scope: `#/properties/font/properties/family/properties/${name}`,
                },
                {
                  type: "Control",
                  label: "Font Size",
                  scope: `#/properties/font/properties/size/properties/${name}/properties/base`,
                },
                {
                  type: "Control",
                  scope: `#/properties/font/properties/size/properties/${name}/properties/shrink-factor`,
                },
                {
                  type: "Control",
                  scope: `#/properties/font/properties/size/properties/${name}/properties/grow-factor`,
                },
                {
                  type: "Control",
                  scope: `#/properties/font/properties/size/properties/${name}/properties/bp-factor`,
                },
              ],
            })),
            {
              type: "Category",
              label: "Weight",
              elements: ["light", "regular", "medium", "semi-bold", "bold"].map(
                (name) => ({
                  type: "Control",
                  scope: `#/properties/font/properties/weight/properties/${name}`,
                })
              ),
            },
          ],
        },
      ],
    },
    {
      type: "Category",
      label: "Spacing",
      elements: [
        {
          type: "Control",
          scope: `#/properties/spacing/properties/base`,
        },
        {
          type: "Control",
          scope: `#/properties/spacing/properties/shrink-factor`,
        },
        {
          type: "Control",
          scope: `#/properties/spacing/properties/grow-factor`,
        },
        {
          type: "Control",
          scope: `#/properties/spacing/properties/bp-factor`,
        },
      ],
    },
  ],
};
