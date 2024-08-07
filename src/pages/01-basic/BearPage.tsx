import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBeards />

        <PolarBear />

        <PandaBear />

        <BearDisplay />

      </div>
    </>
  );
};

export const BlackBeards = () => {
  // consumir store 
  const blackBears = useBearStore((state) => state.blackBeards)
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears)

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => increaseBlackBears(1)}
        > +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{blackBears}</span>
        <button
          onClick={() => increaseBlackBears(-1)}
        >-1</button>
      </div>

    </WhiteCard>
  )
}

export const PolarBear = () => {
  const increasePolarBears = useBearStore((state) => state.increasePolarBears)
  const polarBear = useBearStore((state) => state.polarBeards)

  return (
    <WhiteCard centered>
      <h2>Osos polares</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => increasePolarBears(1)}
        > +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{polarBear}</span>
        <button
          onClick={() => increasePolarBears(-1)}
        >-1</button>
      </div>

    </WhiteCard>
  )
}

export const PandaBear = () => {
  const increasePandaBears = useBearStore((state) => state.increasePandaBears)
  const pandaBear = useBearStore((state) => state.pandaBeards)

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => increasePandaBears(1)}
        > +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{pandaBear}</span>
        <button
          onClick={() => increasePandaBears(-1)}
        >-1</button>
      </div>

    </WhiteCard>
  )
}

export const BearDisplay = () => {
  const bears = useBearStore(useShallow(state => state.bears))
  const doNothing = useBearStore(state => state.doNothing)
  const addBears = useBearStore(state => state.addBear)
  const clearBears = useBearStore(state => state.clearBears)

  return (
    <WhiteCard>
      <h1>osos</h1>

      <button
      className='block mt-2'
        onClick={doNothing}
      >No hace nada</button>
      <button
      className='block mt-2'
        onClick={addBears}
      >Agregar oso</button>
      <button
      className='block mt-2'
        onClick={clearBears}
      >Borrar osos</button>

      <pre>
        {
          JSON.stringify(bears, null, 2)
        }
      </pre>
    </WhiteCard>
  )
}

