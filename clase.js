const { promises: fs } = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async save(nuevoObjeto) {
    //Obtner todos los datos que ya existe en el archivo

    const objetos = await this.getAll();

    //hacer la logica para obtener el nuevo id
    let newId;
    if (objetos.length == 0) {
      newId = 1;
    } else {
      const ultimoId = parseInt(objetos[objetos.length - 1].id);
      newId = ultimoId + 1;
    }
    //agregar el nuevo objeto al array que existe en el archivo
    objetos.push({ ...nuevoObjeto, id: newId });
    //guardar el nuvevo array con el nuevo agregado
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return newId;
    } catch (error) {
      console.log(`Error al guardar: ${error}`);
    }
  }
  async getById(id) {
    try {
      const content = await this.getAll();
      
      const item = content.find((item) => item.id === id);
      if (item.length === 0) {
        return null;
      } 
      return JSON.stringify(item);
      
    } catch (err) {
      console.log(`${err}`);
    }
  }

  async getAll() {
    try {
      const objetos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objetos);
    } catch (error) {
      console.log(`Error al leer archivo:${error}`);
    }
  }
  async deleteById(id) {
    //obtener todos los datos que ya existen en el archivo
    const objetos = await this.getAll();
    //filtrar todos los datos para identificar el objeto a eliminar y eliminarlo
    const nuevoObjeto = objetos.filter((elemento) => elemento.id !== id);
    if (nuevoObjeto.length === objetos.length) {
      console.log(`Error al borrar:no se encontro el id:${id}`);
    }
    try {
      await fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2));
    } catch (error) {
      console.log(`Error al borrar:no se encontro el error:${error}`);
    }
  }
  async deleteAll() {
    try {
      const content = [];
      fs.writeFile(this.ruta, JSON.stringify(content, null, 2));
    } catch (err) {
      console.log(`${err}`);
    }
  }
}

const listaProductos = new Contenedor("./productos.txt");

//Metodos:
// listaProductos.save({ title: "Acondicionador", price: "12usd" });
// listaProductos.deleteById(1);
// listaProductos.getById(2);

// listaProductos.deleteAll();

module.exports=Contenedor;