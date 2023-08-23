import { objectType } from "nexus";

const Destination = objectType({
  name: "Destination",
  definition(t) {
    t.id("id"), 
    t.string("name");
    t.field("image", {
      type: "Image",
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.destination
          .findUniqueOrThrow({ where: { id: id } })
          .image();
      },
    });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

export default Destination;
