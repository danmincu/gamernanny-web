using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
using System.Management;

namespace KillProcess
{
    class Program
    {
        static void Main(string[] args)
        {
            string ProcessName = args[0];
            string ProcessUserName = args[1];
            string HasStartedForHours = args[2];
            ProcessHelper.ProcessHelper ph = new ProcessHelper.ProcessHelper();

            ph.KillProcessByNameAndUser(ProcessName, ProcessUserName, Convert.ToInt32(HasStartedForHours));
           
            Console.Read();
        }




    }
}
