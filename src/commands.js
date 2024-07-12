
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from'node:fs/promises'
const DB_PATH =new URL('../db.json', import.meta.url)
const insert = async (note)=>{
    const db=JSON.parse(await fs.readFile(DB_PATH,'utf-8'));
    db.notes.push(note);
    console.log(db)
    await fs.writeFile(DB_PATH,JSON.stringify(db , null, 2))
}
const newNote=async (note,tags)=>{
    const newNote={
        tags,
        id:Date.now(),
        content:note
    }
    await insert(newNote);
    return newNote;
}
yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note ', (yargs) => {
    return yargs.positional('note',{
        type:"String",
        discription:"The content of note to be created "

    })
  }, 
  async(argv) => {
    const tags=argv.tags? argv.tags.split(','):[]
    const note=await newNote(argv.note,tags)
  })
  .options('tags',{
    alias:'t',
    type:'Sting',
    discripton:'tags to add a new note'
  })
  .command('all ', 'Display all notes saved ', () => {}, (argv) => {
    console.log(argv.note)
  })
  .command('find <filter>', 'Search a particular note', (yargs) => {
    return yargs.positional('filter',{
        type:"String",
        discription:"The search keyword for filter "

    })
  }, (argv) => {
    console.log(argv.note)
  })
  .command('remove <remove>', 'To remove a note by id', (yargs) => {
    return yargs.positional('note',{
        type:"number",
        discription:"The note to be deleted"

    })

  }, (argv) => {
    console.log(argv.note)
  })

  .command('web [port]', 'Launch web App', (yargs) => {
    return yargs.positional('port',{
        type:"number",
        discription:"The port to bind",
        default:5000

    })
  }, (argv) => {
    console.log(argv.note)
  })
  .command('clean ', 'Remove all notes', () => {}, (argv) => {
    console.log(argv.note)
  })
  .demandCommand(1)
  .parse()

