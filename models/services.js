module.exports = function(sequelize, DataTypes) {
  const Services = sequelize.define("Services", {
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["Dog", "Cat", "Rabbit"],
      validate: {
        len: [1]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      values: [
        "Bath & Full Haircut",
        "Bath & Brush",
        "Nail Trim",
        "Flea and Tick Treatment",
        "Bath & Full Haircut"
      ],
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      values: [
        "For pets who need a bath & haircut.",
        "For pets who just need a bath to maintain a healthy-looking coat, clean ears & trimmed nails.",
        "Prevents painful splaying & splitting of your pets nails.",
        "Our all-natural flea and tick shampoos work safely with Frontline or other similar preventative applications.",
        "For pets who need a bath & haircut."
      ],
      validate: {
        len: [1]
      }
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1, 255]
    }
  });

  return Services;
};
