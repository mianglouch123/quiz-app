import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import CardUserAttempInfo from '../global-components/CardUserAttempInfo.jsx';
import UseGetAttempUserIdByQuizId from '../../hooks/quiz/UseGetAttempUserIdByQuizId.jsx';

export default function ModalQuizInfoAttemp({ data, isOpen, setIsOpen, id }) {
  const [page, setPage] = useState(1);
  const [dataMoreInfo, setDataMoreInfo] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { getAttempUserIdByQuizId } = UseGetAttempUserIdByQuizId();
  const userId = localStorage.getItem("user");

  // 🔁 Paginación
  useEffect(() => {
    if (page < 2 || !id) return;

    async function loadMoreData() {
      const res = await getAttempUserIdByQuizId({ userId, quizId: id, page });
      if (res.ok) {
        const newAttempts = res.data.attemps || [];
        if (newAttempts.length > 0) {
          setDataMoreInfo((prev) => [...prev, ...newAttempts]);
        } else {
          setHasMore(false);
          setPage((prev) => prev - 1);
        }
      }
    }

    loadMoreData();
  }, [page, id]);

  function close() {
    const params = new URLSearchParams(location.search);
    params.delete("id");
    setIsOpen(false);
    navigate({ search: params.toString() }, { replace: true });
  }

  function handleSetPage() {
    setPage((prev) => prev + 1);
  }

  const allAttempts = [...(data?.attemps || []), ...dataMoreInfo];

  return (
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
            {/* Cerrar */}
            <div className="w-full flex justify-end px-8">
              <img
                src="/close-icon.svg"
                alt="Cerrar"
                onClick={close}
                className="h-[30px] w-[30px] cursor-pointer"
              />
            </div>

            <DialogTitle as="h3" className="text-3xl font-medium text-black px-8 mt-4">
              Attemps Info
            </DialogTitle>

            {/* Info resumen */}
            <section className="flex items-center justify-center gap-12 md:gap-16 mt-12">
              <h2 className="font-bold">Times played: {parseInt(data.totalTries?.[0]?.tries || 0)}</h2>
              <h2 className="font-bold">Total score: {parseInt(data.totalTries?.[0]?.totalScore || 0)}</h2>
            </section>

            {/* Lista de intentos */}
            {allAttempts.length > 0 ? (
              <div className="flex flex-col mt-12 w-full md:w-[70%] items-center gap-4">
                {allAttempts.map((user) => (
                  <CardUserAttempInfo key={user._id} data={user} />
                ))}

                {hasMore && (
                  <button
                    onClick={handleSetPage}
                    className="bg-black text-white rounded-full px-8 py-3 mt-8"
                  >
                    Load More
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-16 text-center text-gray-600 font-medium text-lg">
                Aún no hay usuarios que hayan jugado este quiz.
              </p>
            )}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
