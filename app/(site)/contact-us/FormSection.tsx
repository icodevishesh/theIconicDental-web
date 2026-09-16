"use client";

import ThankYouModal from "@/components/utility/ThankYouModal";
import Image from "next/image";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from '@/lib/api';
import whatsApp from "@/assets/whatsapp-brands-solid-full.svg"

export default function FormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    position: "",
    productCategory: "",
    acceptTerms: false,
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.position ||
      !formData.productCategory
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    if (!formData.acceptTerms) {
      setSubmitStatus({
        type: "error",
        message: "Please accept the terms and conditions",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await submitContactForm({
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        productCategory: formData.productCategory
      });

      // Reset form on success
      setFormData({
        firstName: "",
        email: "",
        phone: "",
        position: "",
        productCategory: "",
        acceptTerms: false,
      });

      setShowThankYouModal(true);
      setSubmitStatus({ type: "success", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred while submitting the form"
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <section className="bg-white text-center px-4 py-6 md:py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-teal-700">
          Reach Out, We&apos;re Listening
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Share your challenges, ideas, or requests. Our experts will be in
          touch soon to move things forward.
        </p>

        {/* Status Message */}
        <ThankYouModal
          isOpen={showThankYouModal}
          onClose={() => setShowThankYouModal(false)}
          autoClose={true}
          autoCloseDelay={5000}
        />

        {submitStatus.message && (
          <div
            className={`mt-4 p-3 rounded-md max-w-2xl mx-auto text-sm ${submitStatus.type === "error"
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-green-100 text-green-700 border border-green-200"
              }`}
          >
            {submitStatus.message}
          </div>
        )}
      </section>

      <section className="bg-white px-2 py-4 md:py-8 max-w-6xl mx-auto">
        <div className="w-full bg-white sm:w-[90%] mx-auto flex flex-col md:flex-row rounded-2xl shadow-lg items-stretch justify-center overflow-visible md:min-h-[420px] border sm:border border-gray-100">
          {/* Contact Info Sidebar */}
          <div className="w-full md:w-2/5 bg-teal-700 text-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-2xl flex flex-col">
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* Phone */}
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  {/* <Phone size={24} className="text-teal-700" /> */}
                  <Image src={whatsApp} width="60" height="60" alt="whatsapp" className="w-8 h-8 text-teal-700"/>
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Phone Number
                  </h3>
                  <a
                    href="https://wa.me/16478028420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline mb-1"
                  >
                    +1 647 802 8420
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  <Mail size={24} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Email Addresss
                  </h3>
                  <a href="mailto:info@theiconicdental.com" className="text-sm hover:underline">
                  info@theiconicdental.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  <MapPin size={24} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Office Address
                  </h3>
                  <p className="text-sm sm:text-sm">
                    173163, Ave NW Edmonton, AB T5T 2K1
                  </p>
                </div>
              </div>

              {/* Office Timings */}
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  <Clock size={24} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-sm sm:text-base">
                    Office Timings
                  </h3>
                  <p className="text-sm sm:text-sm">
                    Monday-Saturday (9:00am - 5:00pm)
                  </p>
                  <p className="text-sm sm:text-sm">Sunday Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-3/5 bg-white p-5 sm:p-6 md:p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Full Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full h-11 px-4 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-500 placeholder-gray-400"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Are You A
                  </label>
                  <div>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full h-11 pl-4 pr-10 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-500 appearance-none"
                      autoComplete="on"
                      required
                    >
                      <option value="" disabled>
                        Pick an option
                      </option>
                      <option value="dentist">Dentist / DSO</option>
                      <option value="lab">Lab Owner</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-11 px-4 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-500 placeholder-gray-400"
                    autoComplete="email"
                    suppressHydrationWarning
                    required
                  />
                </div>
                {/* Mobile Number */}
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Mobile Number
                  </label>
                  <div className="flex w-full">
                    {/* Country Code */}
                    <div className="relative flex-shrink-0 w-24 mr-2 pr-1">
                      <select
                        id="countryCode"
                        name="countryCode"
                        className="w-full h-11 px-3 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-600 appearance-none pr-6"
                      >
                        <option value="+1">+1</option>
                        <option value="+1-242">+1-242</option>
                        <option value="+1-246">+1-246</option>
                        <option value="+1-264">+1-264</option>
                        <option value="+1-268">+1-268</option>
                        <option value="+1-649">+1-649</option>
                        <option value="+1-664">+1-664</option>
                        <option value="+1-670">+1-670</option>
                        <option value="+1-671">+1-671</option>
                        <option value="+1-684">+1-684</option>
                        <option value="+1-721">+1-721</option>
                        <option value="+1-758">+1-758</option>
                        <option value="+1-767">+1-767</option>
                        <option value="+1-784">+1-784</option>
                        <option value="+1-787">+1-787</option>
                        <option value="+1-809">+1-809</option>
                        <option value="+1-829">+1-829</option>
                        <option value="+1-849">+1-849</option>
                        <option value="+1-868">+1-868</option>
                        <option value="+1-869">+1-869</option>
                        <option value="+1-876">+1-876</option>
                        <option value="+1-939">+1-939</option>
                        <option value="+7">+7</option>
                        <option value="+20">+20</option>
                        <option value="+27">+27</option>
                        <option value="+30">+30</option>
                        <option value="+31">+31</option>
                        <option value="+32">+32</option>
                        <option value="+33">+33</option>
                        <option value="+34">+34</option>
                        <option value="+36">+36</option>
                        <option value="+39">+39</option>
                        <option value="+40">+40</option>
                        <option value="+41">+41</option>
                        <option value="+43">+43</option>
                        <option value="+44">+44</option>
                        <option value="+44-1481">+44-1481</option>
                        <option value="+44-1534">+44-1534</option>
                        <option value="+44-1624">+44-1624</option>
                        <option value="+45">+45</option>
                        <option value="+46">+46</option>
                        <option value="+47">+47</option>
                        <option value="+48">+48</option>
                        <option value="+49">+49</option>
                        <option value="+51">+51</option>
                        <option value="+52">+52</option>
                        <option value="+53">+53</option>
                        <option value="+54">+54</option>
                        <option value="+55">+55</option>
                        <option value="+56">+56</option>
                        <option value="+57">+57</option>
                        <option value="+58">+58</option>
                        <option value="+60">+60</option>
                        <option value="+61">+61</option>
                        <option value="+62">+62</option>
                        <option value="+63">+63</option>
                        <option value="+64">+64</option>
                        <option value="+65">+65</option>
                        <option value="+66">+66</option>
                        <option value="+81">+81</option>
                        <option value="+82">+82</option>
                        <option value="+84">+84</option>
                        <option value="+86">+86</option>
                        <option value="+90">+90</option>
                        <option value="+91">+91</option>
                        <option value="+92">+92</option>
                        <option value="+93">+93</option>
                        <option value="+94">+94</option>
                        <option value="+95">+95</option>
                        <option value="+98">+98</option>
                        <option value="+211">+211</option>
                        <option value="+212">+212</option>
                        <option value="+213">+213</option>
                        <option value="+216">+216</option>
                        <option value="+218">+218</option>
                        <option value="+220">+220</option>
                        <option value="+221">+221</option>
                        <option value="+222">+222</option>
                        <option value="+223">+223</option>
                        <option value="+224">+224</option>
                        <option value="+225">+225</option>
                        <option value="+226">+226</option>
                        <option value="+227">+227</option>
                        <option value="+228">+228</option>
                        <option value="+229">+229</option>
                        <option value="+230">+230</option>
                        <option value="+231">+231</option>
                        <option value="+232">+232</option>
                        <option value="+233">+233</option>
                        <option value="+234">+234</option>
                        <option value="+235">+235</option>
                        <option value="+236">+236</option>
                        <option value="+237">+237</option>
                        <option value="+238">+238</option>
                        <option value="+239">+239</option>
                        <option value="+240">+240</option>
                        <option value="+241">+241</option>
                        <option value="+242">+242</option>
                        <option value="+243">+243</option>
                        <option value="+244">+244</option>
                        <option value="+245">+245</option>
                        <option value="+246">+246</option>
                        <option value="+248">+248</option>
                        <option value="+249">+249</option>
                        <option value="+250">+250</option>
                        <option value="+251">+251</option>
                        <option value="+252">+252</option>
                        <option value="+253">+253</option>
                        <option value="+254">+254</option>
                        <option value="+255">+255</option>
                        <option value="+256">+256</option>
                        <option value="+257">+257</option>
                        <option value="+258">+258</option>
                        <option value="+260">+260</option>
                        <option value="+261">+261</option>
                        <option value="+262">+262</option>
                        <option value="+263">+263</option>
                        <option value="+264">+264</option>
                        <option value="+265">+265</option>
                        <option value="+266">+266</option>
                        <option value="+267">+267</option>
                        <option value="+268">+268</option>
                        <option value="+269">+269</option>
                        <option value="+290">+290</option>
                        <option value="+291">+291</option>
                        <option value="+297">+297</option>
                        <option value="+298">+298</option>
                        <option value="+299">+299</option>
                        <option value="+350">+350</option>
                        <option value="+351">+351</option>
                        <option value="+352">+352</option>
                        <option value="+353">+353</option>
                        <option value="+354">+354</option>
                        <option value="+355">+355</option>
                        <option value="+356">+356</option>
                        <option value="+357">+357</option>
                        <option value="+358">+358</option>
                        <option value="+359">+359</option>
                        <option value="+370">+370</option>
                        <option value="+371">+371</option>
                        <option value="+372">+372</option>
                        <option value="+373">+373</option>
                        <option value="+374">+374</option>
                        <option value="+375">+375</option>
                        <option value="+376">+376</option>
                        <option value="+377">+377</option>
                        <option value="+378">+378</option>
                        <option value="+379">+379</option>
                        <option value="+380">+380</option>
                        <option value="+381">+381</option>
                        <option value="+382">+382</option>
                        <option value="+383">+383</option>
                        <option value="+385">+385</option>
                        <option value="+386">+386</option>
                        <option value="+387">+387</option>
                        <option value="+389">+389</option>
                        <option value="+420">+420</option>
                        <option value="+421">+421</option>
                        <option value="+500">+500</option>
                        <option value="+501">+501</option>
                        <option value="+502">+502</option>
                        <option value="+503">+503</option>
                        <option value="+504">+504</option>
                        <option value="+505">+505</option>
                        <option value="+506">+506</option>
                        <option value="+507">+507</option>
                        <option value="+508">+508</option>
                        <option value="+509">+509</option>
                        <option value="+590">+590</option>
                        <option value="+591">+591</option>
                        <option value="+592">+592</option>
                        <option value="+593">+593</option>
                        <option value="+594">+594</option>
                        <option value="+595">+595</option>
                        <option value="+596">+596</option>
                        <option value="+597">+597</option>
                        <option value="+598">+598</option>
                        <option value="+599">+599</option>
                        <option value="+670">+670</option>
                        <option value="+672">+672</option>
                        <option value="+673">+673</option>
                        <option value="+674">+674</option>
                        <option value="+675">+675</option>
                        <option value="+676">+676</option>
                        <option value="+677">+677</option>
                        <option value="+678">+678</option>
                        <option value="+679">+679</option>
                        <option value="+680">+680</option>
                        <option value="+681">+681</option>
                        <option value="+682">+682</option>
                        <option value="+683">+683</option>
                        <option value="+685">+685</option>
                        <option value="+686">+686</option>
                        <option value="+687">+687</option>
                        <option value="+688">+688</option>
                        <option value="+689">+689</option>
                        <option value="+690">+690</option>
                        <option value="+691">+691</option>
                        <option value="+692">+692</option>
                        <option value="+850">+850</option>
                        <option value="+852">+852</option>
                        <option value="+853">+853</option>
                        <option value="+855">+855</option>
                        <option value="+856">+856</option>
                        <option value="+880">+880</option>
                        <option value="+886">+886</option>
                        <option value="+960">+960</option>
                        <option value="+961">+961</option>
                        <option value="+962">+962</option>
                        <option value="+963">+963</option>
                        <option value="+964">+964</option>
                        <option value="+965">+965</option>
                        <option value="+966">+966</option>
                        <option value="+967">+967</option>
                        <option value="+968">+968</option>
                        <option value="+970">+970</option>
                        <option value="+971">+971</option>
                        <option value="+972">+972</option>
                        <option value="+973">+973</option>
                        <option value="+974">+974</option>
                        <option value="+975">+975</option>
                        <option value="+976">+976</option>
                        <option value="+977">+977</option>
                        <option value="+992">+992</option>
                        <option value="+993">+993</option>
                        <option value="+994">+994</option>
                        <option value="+995">+995</option>
                        <option value="+996">+996</option>
                        <option value="+998">+998</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                      className="flex-1 min-w-0 h-11 px-4 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-600 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Product Category */}
              <div>
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-500 mb-2"
                >
                  Product Category
                </label>
                <div className="relative">
                  <select
                    id="productCategory"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    autoComplete="on"
                    required
                    className="w-full h-11 pl-4 pr-10 border border-gray-200 rounded-md focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-500 appearance-none"
                  >
                    <option value="" disabled>
                      Select Product Category
                    </option>
                    <option value="crown">Crown & Bridges</option>
                    <option value="denture">Digital Denture</option>
                    <option value="veneers">Veneers</option>
                    <option value="implants">Implants</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 block text-sm text-gray-500"
                >
                  I accept the Terms
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting
                    ? "bg-teal-500 cursor-not-allowed"
                    : "bg-teal-700 hover:bg-teal-800"
                    } text-white py-3 px-4 rounded-md transition duration-300 font-medium flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Let's Talk"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
