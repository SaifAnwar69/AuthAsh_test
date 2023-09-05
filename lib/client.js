import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "ww5vg8x7",
  dataset: "production",
  apiVersion: "2023-09-04",
  useCdn: true,
  token:
    "sk6FVGTVlWGz6Q1B3ebkvguS00iJ6h6z81iwS2pPCqlykv1C9Dsla3m665PDIRjfHcePHmfjf4QaZ0EKfb9u2jfuO65wm9C44ecQaurDlvE8agkezaFU1ebnCJNJeqLiKWKyvMiVsGo8fCRYPeAW9vDn4vO0ympdBSE3VFV0P2McRGHNZC4C",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
