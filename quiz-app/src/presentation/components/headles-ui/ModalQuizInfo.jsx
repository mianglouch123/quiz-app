import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // 👈 añade esto arriba
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import CardUser from '../global-components/CardUsers.jsx';
import CardUserScore from '../global-components/CardUserScore.jsx';
import UseGetTotalUsersByQuizId from '../../hooks/quiz/useGetTotalUsersByQuizId.jsx';
import { HEIGHTS, COLORS_POSITION, POSITIONS } from '../mocks/variablesCardUser.js';

export default function ModalQuizInfo({ data, isOpen, setIsOpen , id }) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // 👈 dentro del componente

  const { getTotalUsersByQuizId } = UseGetTotalUsersByQuizId();


 // Carga inicial
 useEffect(() => {
  if (!id || !isOpen) return;

  setUsers([]);
  setPage(1);
  setHasMore(true);

  async function fetchInitialUsers() {
    const res = await getTotalUsersByQuizId({ id, page: 1 });
    if (res.ok && Array.isArray(res.data)) {
      setUsers(res.data);
      if (res.data.length === 0) setHasMore(false);
    }
  }

  fetchInitialUsers();
}, [id, isOpen]); // se reinicia cuando cambia el id o se abre el modal




  useEffect(() => {
  if (!shouldFetch || !id) return;

  async function fetchMore() {
    const res = await getTotalUsersByQuizId({ id, page });

    if (res.ok && Array.isArray(res.data)) {
      if (res.data.length > 0) {
        setUsers(prev => [...prev, ...res.data]);
      } else {
        setHasMore(false);
      }
    }

    setShouldFetch(false);
  }

  fetchMore();
}, [page, shouldFetch , id]); // ⬅️ importante incluir `id`


 

  function close() {
  const params = new URLSearchParams(location.search);
  params.delete("id");
  setIsOpen(false);
  navigate({ search: params.toString() }, { replace: true });
}

  function handleSetPage() {
    setPage(prev => prev + 1);
    setShouldFetch(true);
  }



  return (
    <>
     
<Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-10"
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-white text-black flex flex-col items-center py-8 min-h-screen">
            {/* Botón cerrar */}
            <div className="w-full flex justify-end px-8">
              <img
                src="/close-icon.svg"
                alt="Cerrar"
                onClick={close}
                className="h-[30px] w-[30px] cursor-pointer"
              />
            </div>

            <DialogTitle as="h3" className="text-3xl font-medium text-black px-8 mt-4">
              Top Users
            </DialogTitle>

            <div className="flex w-full items-center justify-center gap-2 md:gap-12 mt-8">
              {data?.usersWithMoreClasification?.length > 0 &&
                data.usersWithMoreClasification.map((user, idx) => (
                  <CardUser
                    key={user._id}
                    user={user}
                    idx={idx}
                    colorsPosition={COLORS_POSITION[data.usersWithMoreClasification.length]}
                    heights={HEIGHTS[data.usersWithMoreClasification.length]}
                    positions={POSITIONS[data.usersWithMoreClasification.length]}
                  />
                ))}
            </div>

            <section className="flex items-center justify-center gap-12 md:gap-16 mt-12">
              <h2 className="font-bold">Total Users: {data.totalUsers}</h2>
              <h2 className="font-bold">Total Avg: {Math.round(data.totalAvg)}</h2>
            </section>

            {/* Mostrar usuarios solo si hay alguno */}
            {data.totalUsers > 0 ? (
              <div className="flex flex-col min-h-screen mt-12 overflow-y-auto w-[100%] md:w-[70%] items-center justify-start">
                {users.length > 0 && users.map((user, idx) => (
                  <CardUserScore key={user._id} data={user} pos={idx} />
                ))}

                {hasMore && (
                  <div className='mt-8 flex items-end justify-end'>
                    <button
                      onClick={handleSetPage}
                      className='bg-black cursor-pointer text-white rounded-full pl-8 pr-8 text-center h-[50px] w-[175px]'
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-16 text-center font-medium text-lg text-gray-600">
                Aún no hay usuarios que hayan jugado este quiz.
              </p>
            )}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
     
   </>
  );
}
