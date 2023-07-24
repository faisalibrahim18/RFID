import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";
const GuideBook = () => {
  return (
    <>
      <div className=" p-2">
        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-1/2">
            <h1 className="text-3xl font-semibold mt-3 mb-5">Guide Book</h1>
          </div>
        </div>

        <div className="flex flex-wrap flex-row">
          <div className="flex-shrink max-w-full px-4 w-full">
            <div className="p-6 bg-white  rounded-lg shadow-lg mb-6">
              <div className="w-full px-4 pt-6">
                <div className="mx-auto w-full p-2">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b-0 border-gray-200 rounded-t-lg hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-lg hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>User Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b-0 bg-gray-50 border-gray-200"
                          >
                            User Management yang berfungsi untuk mengelola
                            pengguna. Halaman ini menampilkan tabel User yang
                            berisi kolom-kolom seperti Nama, Username, Email,
                            dan Role. Pada setiap baris tabel, terdapat tombol
                            "Edit" yang memungkinkan admin untuk mengubah data
                            pengguna dan tombol "Delete" untuk menghapus data
                            pengguna, User Management berfungsi untuk memberikan
                            kemudahan bagi admin untuk mengelola pengguna dengan
                            melakukan tambah data, edit data, dan delete data
                            pada tabel User.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Rumah Sakit Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Rumah Sakit Management yang berfungsi untuk
                            mengelola pengguna. Halaman ini menampilkan tabel
                            Rumah Sakit yang berisi kolom-kolom seperti Kode
                            rumah sakit, Nama Rumah sakit, No Telephone, dan
                            Alamat . Pada setiap baris tabel, terdapat tombol
                            "Edit" yang memungkinkan admin untuk mengubah data
                            pengguna dan tombol "Delete" untuk menghapus data
                            pengguna, Rumah Sakit Management berfungsi untuk
                            memberikan kemudahan bagi admin untuk mengelola
                            rumah sakit dengan melakukan tambah data, edit data,
                            dan delete data pada tabel Rumah Sakit.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Kategori Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Kategori Management yang berfungsi untuk mengelola
                            pengguna. Halaman ini menampilkan tabel Kategori
                            yang berisi kolom-kolom seperti Nama Kategori,
                            Expired, dan Unit. Pada setiap baris tabel, terdapat
                            tombol "Edit" yang memungkinkan admin untuk mengubah
                            data pengguna dan tombol "Delete" untuk menghapus
                            data pengguna, Kategori Management berfungsi untuk
                            memberikan kemudahan bagi admin untuk mengelola
                            kategori dengan melakukan tambah data, edit data,
                            dan delete data pada tabel Kategori Management.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Linen Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Linen Management yang berfungsi untuk mengelola
                            linen. Halaman ini menampilkan tabel Kategori yang
                            berisi kolom-kolom seperti Kode, Rumah Sakit, Linen,
                            Kategori, Counter. Pada setiap baris tabel, terdapat
                            tombol "Edit" yang memungkinkan admin untuk mengubah
                            data pengguna dan tombol "Delete" untuk menghapus
                            data pengguna, Linen Management berfungsi untuk
                            memberikan kemudahan bagi admin untuk mengelola
                            Linen dengan melakukan tambah data, edit data, dan
                            delete data pada tabel Linen Management.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Inventory Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Inventory Management yang berfungsi untuk mengelola
                            inventory. Halaman ini menampilkan tabel Inventory
                            yang berisi kolom-kolom seperti Nama Barang, Jumah,
                            Status. Pada setiap baris tabel, terdapat tombol
                            "Edit" yang memungkinkan admin untuk mengubah data
                            pengguna dan tombol "Delete" untuk menghapus data
                            pengguna, Inventory Management berfungsi untuk
                            memberikan kemudahan bagi admin untuk mengelola
                            Inventory dengan melakukan tambah data, edit data,
                            dan delete data pada tabel Inventory Management.
                            Inventory Management yang berfungsi untuk mengelola
                            inventory. Halaman ini menampilkan tabel Inventory
                            yang berisi kolom-kolom seperti Nama Barang, Jumah,
                            Status. Pada setiap baris tabel, terdapat tombol
                            "Edit" yang memungkinkan admin untuk mengubah data
                            pengguna dan tombol "Delete" untuk menghapus data
                            pengguna, Inventory Management berfungsi untuk
                            memberikan kemudahan bagi admin untuk mengelola
                            Inventory dengan melakukan tambah data, edit data,
                            dan delete data pada tabel Inventory Management.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Role Management</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Role Management yang berfungsi untuk mengelola role.
                            Halaman ini menampilkan tabel Role yang berisi
                            kolom-kolom seperti Nama Role, Access. Pada setiap
                            baris tabel, terdapat tombol "Edit" yang
                            memungkinkan admin untuk mengubah data pengguna dan
                            tombol "Delete" untuk menghapus data pengguna, Role
                            Management berfungsi untuk memberikan kemudahan bagi
                            admin untuk mengelola Role dengan melakukan tambah
                            data, edit data, dan delete data pada tabel Role
                            Management.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Laporan</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Halaman laporan yg berfungsi untuk admin melihat
                            laporan dan halaman ini juga berfungsi untuk admin
                            mencetak data dalam bentuk Excel dan Pdf, dari
                            search input Tanggal Awal dan Tanggal Akhir . Selain
                            itu halaman laporan ini memiliki beberapa jalur
                            relasi yg berfungsi untuk admin melihat posisi dan
                            proses laundry yg di tampilkan.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "flex items-center bg-gray-100 justify-between w-full p-5 font-medium text-left text-cyan-600  border border-b border-gray-200 r hover:bg-gray-100 "
                              : "flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b border-gray-200  hover:bg-gray-100 "
                          }`}
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>Tracking</span>
                          <BsChevronUp
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel
                            static
                            className="p-5 border border-b bg-gray-50 border-gray-200"
                          >
                            Halaman Tracking yang berfungsi untuk admin melihat
                            / mentrack lokasi linen sedang di proses mana
                            berdasarkan Rumah Sakit tertentu.
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideBook;
